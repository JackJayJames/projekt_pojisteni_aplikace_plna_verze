'use strict';

export class PridatPojistence{
    #adresy;
    #ulozitTl;
    constructor(adresy, ulozitTl){
        this.#adresy = adresy;
        this.#ulozitTl = ulozitTl;
    }
    spustit(){
        for(const adress in this.#adresy){
            console.log(this.#adresy[adress].validni);
        }
    }
}