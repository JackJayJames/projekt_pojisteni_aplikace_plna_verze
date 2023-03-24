'use strict';

export class Vlastnosti{
    #vlastnost;
    #adresa;
    constructor(vlastnost, adresa){
        this.#vlastnost = vlastnost;
        this.#adresa = adresa;
    }
    get info(){
        return this.#vlastnost;
    }
    vypsat(){
        this.#adresa.textContent = this.#vlastnost;
    }
}