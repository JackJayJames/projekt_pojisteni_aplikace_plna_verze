'use strict';

export class PridatPojistence{
    #adresy;
    #ulozitTl;
    constructor(adresy, ulozitTl){
        this.#adresy = adresy;
        this.#ulozitTl = ulozitTl;
    }
    spustit(){
        console.log(this.#adresy.jmeno.validni);
    }
}