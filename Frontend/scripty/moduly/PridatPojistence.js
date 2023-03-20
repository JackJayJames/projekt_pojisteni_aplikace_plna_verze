'use strict';

export class PridatPojistence{
    #adresy;
    #ulozitTl;
    constructor(adresy, ulozitTl){
        this.#adresy = adresy;
        this.#ulozitTl = ulozitTl;
    }
    #kontrola(){
        const vysledky = [];
        for(const input in this.#adresy){
            vysledky.push(this.#adresy[input].validni);
        }
        vysledky.push(this.#adresy['password_I'].rovno(this.#adresy['assword_II'].hodnota));
        return vysledky;
    }
    spustit(){
        this.#ulozitTl.onclick = () => {
            if(!this.#kontrola().some(e => e === false)){
                console.log("validni");
            }
        };
    }
}