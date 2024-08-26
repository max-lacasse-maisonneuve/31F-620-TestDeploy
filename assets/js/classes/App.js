import page from "page";
import moment from "moment";
import mustache from "mustache";

class App {
    constructor() {
        console.log("App constructor");
        this.sectionAccueil = document.querySelector("[data-page='accueil']");
        this.sectionContact = document.querySelector("[data-page='contact']");
        this.listeAbribusHTML = document.querySelector(".liste");

        page("/", this.afficherAccueil.bind(this));
        page("/contact", this.afficherContact.bind(this));

        page.start();
        // this.afficherAccueil();
        let maintenant = new Date();
        let date2 = moment().format("YYYY-MMMM-ddd");
        this.getData();
    }

    async getData() {
        this.donnees = await fetch(
            "https://www.donneesquebec.ca/recherche/dataset/b36be5a9-c69d-40b7-b024-f61813cc26f9/resource/10c42538-b581-432f-8695-0f5d55122590/download/abribus.json"
        );
        this.abribus = await this.donnees.json();
        console.log(this.abribus);
    }
    async afficherAccueil() {
        await this.getData();

        let clone = [...this.abribus];
        let donneesAfficher = clone.splice(0, 5);

        let data = { abribus: donneesAfficher, titre: "Patate" };
        this.listeAbribusHTML.innerHTML = mustache.render(this.listeAbribusHTML.innerHTML, data);

        this.sectionAccueil.classList.remove("invisible");
        this.sectionContact.classList.add("invisible");
    }

    afficherContact() {
        this.sectionAccueil.classList.add("invisible");
        this.sectionContact.classList.remove("invisible");
    }
}

export default App;
