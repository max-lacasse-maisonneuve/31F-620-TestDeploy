import page from "page";
import moment from "moment";
import mustache from "mustache";
import anime from "animejs/lib/anime.es.js";

class App {
    constructor() {
        //On initialise les variables de l'application

        //Variables pour la pagination
        this.pageIndex = 0;
        this.pageAmount = 6;

        this.sectionAccueil = document.querySelector("[data-page='accueil']");
        this.sectionContact = document.querySelector("[data-page='contact']");
        this.listeAbribusHTML = document.querySelector(".liste");

        //On récupère les boutons pour avancer et reculer
        this.boutonAvancer = this.sectionAccueil.querySelector("button[data-direction='1']");
        this.boutonReculer = this.sectionAccueil.querySelector("button[data-direction='-1']");

        //On ajoute les événements pour les boutons
        this.boutonAvancer.addEventListener("click", this.avancer.bind(this));
        this.boutonReculer.addEventListener("click", this.reculer.bind(this));

        //Base URL de l'application pour les routes et github pages
        this.baseURL = "/31F-620-TestDeploy";
        //On initialise les routes
        page(`${this.baseURL}/`, this.afficherAccueil.bind(this));
        page(`${this.baseURL}/contact`, this.afficherContact.bind(this));
        page.start();

        this.init();
    }

    /**
     * Méthode d'initialisation de l'application
     */
    async init() {
        //On récupère les données au chargement de la page
        await this.getData();
        //On démarre le router
        page.start();
    }

    /**
     * Méthode pour récupérer les données
     */
    async getData() {
        this.donnees = await fetch(
            "https://www.donneesquebec.ca/recherche/dataset/b36be5a9-c69d-40b7-b024-f61813cc26f9/resource/10c42538-b581-432f-8695-0f5d55122590/download/abribus.json"
        );
        this.abribus = await this.donnees.json();
    }

    /**
     * Méthode pour afficher la page d'accueil
     */
    async afficherAccueil() {
        let clone = [...this.abribus];
        let template = document.querySelector("template#abribus").innerHTML;
        let donneesAfficher = clone.splice(this.pageIndex, this.pageAmount);

        let data = { abribus: donneesAfficher };
        this.listeAbribusHTML.innerHTML = mustache.render(template, data);

        anime({
            targets: ".liste .card",
            translateY: [-50, 0],
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 1500,
            easing: "easeOutExpo",
            delay: anime.stagger(100), // increase delay by 100ms for each elements.
        });

        this.sectionAccueil.classList.remove("invisible");
        this.sectionContact.classList.add("invisible");
    }

    /**
     * Méthode pour afficher la page de contact
     */
    afficherContact() {
        this.sectionAccueil.classList.add("invisible");
        this.sectionContact.classList.remove("invisible");
    }

    /**
     * Méthode pour avancer dans la liste des abribus
     * @returns
     */
    avancer() {
        //Si on est à la fin de la liste, on ne fait rien
        if (this.pageIndex + this.pageAmount >= this.abribus.length) {
            return;
        }

        this.pageIndex += this.pageAmount;
        this.afficherAccueil();
    }

    /**
     * Méthode pour reculer dans la liste des abribus
     * @returns
     */
    reculer() {
        //Si on est au début de la liste, on ne fait rien
        if (this.pageIndex - this.pageAmount < 0) {
            return;
        }
        this.pageIndex -= this.pageAmount;
        this.afficherAccueil();
    }
}

export default App;
