'use strict';

export class TvoricTabulky{
    #misto;
    #seznam_pojisteni;
    constructor(misto){
        this.#misto = document.querySelector(misto);
        this.#seznam_pojisteni = {};
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
        this.#seznam_pojisteni[poj._id] = poj;
    }
}