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
        const deleteBtn = this.#vytvoritDeleteButton("poj_deleteBtn", `delete-${obj._id}`);
        container.appendChild(deleteBtn);

        return container;
    }
    #vytvoritDeleteButton(trida, id){
        const button = document.createElement('button');
        button.textContent = "DELETE";
        button.classList = trida;
        button.id = id;
        return button;
    }
    vypsat(){
        if(!Object.keys(this.#seznam_pojisteni).length){
            this.#misto.innerHTML = "Žádná pojištění";
            return;
        } else {
            this.#misto.innerHTML = "";
        }

        for(const poj in this.#seznam_pojisteni){
            this.#misto.appendChild(this.#seznam_pojisteni[poj]);
        }
    }
    pridat(poj){
        const element = this.#vytvoritContainer(poj);
        this.#seznam_pojisteni[poj._id] = element;

        this.vypsat();
    }
}