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

        const platnost = this.#vytvoritElem('div', "platnost", obj.platnost_do);
        container.appendChild(platnost);

        console.log(obj);
        console.log(container);
    }
    vypsat(){
        console.log("-");
        console.log(this.#seznam_pojisteni);
        console.log("-");

        for(const poj in this.#seznam_pojisteni){
            console.log(poj);
        }
    }
    pridat(poj){
        const element = this.#vytvoritContainer(poj);
        //this.#seznam_pojisteni[poj._id] = poj;
        this.vypsat();
    }
}