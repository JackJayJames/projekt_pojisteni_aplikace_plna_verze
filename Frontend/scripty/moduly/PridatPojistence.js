'use strict';

import { Ajax } from "./Ajax.js";

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
        return vysledky;
    }
    #odeslatPojistence(){
        Ajax.get(`http://127.0.0.1:5500/api/pojistenec/641894484803d20877d7bc6d/641894494803d20877d7bc70`);
    }
    spustit(){
        this.#ulozitTl.onclick = () => {
            this.#odeslatPojistence();
            if(!this.#kontrola().some(e => e === false)){
                if(this.#adresy['password_II'].rovno(this.#adresy['password_I'].hodnota, "Hesla nejsou stejná"))    return;
                this.#odeslatPojistence();
            }
        };
    }
}