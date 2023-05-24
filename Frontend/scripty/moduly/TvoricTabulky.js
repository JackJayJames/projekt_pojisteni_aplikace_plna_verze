'use strict';

export class TvoricTabulky{
    #misto;
    #seznam_pojisteni;
    constructor(misto){
        this.#misto = misto;
        this.#seznam_pojisteni = {};
    }

    pridat(poj){
        console.log("tvor " + poj.info);
    }
}