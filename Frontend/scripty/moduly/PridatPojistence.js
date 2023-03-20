'use strict';

export class PridatPojistence{
    #adresy;
    #ulozitTl;
    constructor(adresy, ulozitTl){
        this.#adresy = adresy;
        this.#ulozitTl = ulozitTl;
    }
    spustit(){
        this.#ulozitTl.onclick = () => {
            for(const input in this.#adresy){
                console.log(this.#adresy[input].validni);
            }
        };
    }
}