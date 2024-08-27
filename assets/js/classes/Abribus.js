class Abribus {
    #id;
    #adresse;
    #dateModification;
    #emplacement;
    #municipalite;

    constructor(id, adresse, dateModification, emplacement, municipalite) {
        this.#id = id;
        this.#adresse = adresse;
        this.#dateModification = dateModification;
        this.#emplacement = emplacement;
        this.#municipalite = municipalite;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        if (id < 0) {
            throw new Error("L'identifiant ne peut pas être négatif.");
        }
        
        this.#id = id;
    }

    get adresse() {
        return this.#adresse;
    }

    set adresse(adresse) {
        this._adresse = adresse;
    }

    afficherInfos() {
        return `Abribus ${this.#id} : ${this.#adresse} à ${this.#municipalite}`;
    }
}

export default Abribus;
