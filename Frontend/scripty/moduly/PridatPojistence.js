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
        Ajax.post("http://localhost:5500/api/pojistenec/6419455974e665c9f2bdcd45/6419455974e665c9f2bdcd48")
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
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