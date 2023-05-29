'use strict';

export class TvoricTabulky{
    #misto;
    #seznam_pojisteni;
    constructor(misto){
        this.#misto = document.querySelector(misto);
        this.#seznam_pojisteni = {};
    }
    #vytvoritContainer(obj){
        const container = document.createElement('div');
        container.classList = 'elemPojist';
        container.id = obj._id;

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