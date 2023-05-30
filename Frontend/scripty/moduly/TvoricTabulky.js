'use strict';

export class TvoricTabulky{
    #misto;
    #seznam_pojisteni;
    constructor(misto){
        this.#misto = document.querySelector(misto);
        this.#seznam_pojisteni = {};
    }
    #vytvoritElem(type, trida, text){
        const elem = document.createElement(type);
        elem.classList = trida;
        elem.innerText = text;
        return elem;
    }
    #vytvoritContainer(obj){
        const container = document.createElement('div');
        container.classList = 'elemPojist';
        container.id = obj._id;

        const predmet = this.#vytvoritElem('h3', "predmet", obj.predmet);
        container.appendChild(predmet);

        const nazev = this.#vytvoritElem('h4', "nazev", obj.nazev);
        container.appendChild(nazev);

        const castka = this.#vytvoritElem('div', "castka", obj.castka);
        container.appendChild(castka);

        const platnost = this.#vytvoritElem('div', "platnost", new Date(obj.platnost_do).toLocaleDateString());
        container.appendChild(platnost);

        return container;
    }
    vypsat(){
        if(!Object.keys(this.#seznam_pojisteni).length){
            this.#misto.innerHTML = "Žádná pojištění";
            return;
        } else {
            this.#misto.innerHTML = "";
        }

        for(const poj in this.#seznam_pojisteni){
            console.log(this.#seznam_pojisteni[poj]);
            this.#misto.appendChild(this.#seznam_pojisteni[poj]);
        }
    }
    pridat(poj){
        const element = this.#vytvoritContainer(poj);
        this.#seznam_pojisteni[poj._id] = element;

        this.vypsat();
    }
}