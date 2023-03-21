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
    #vytvoritDataObj(){
        const pojistenec = {};
        for(const property in this.#adresy){
            if(property === 'password_II') continue;
            pojistenec[property] = this.#adresy[property].hodnota;
        }
        return pojistenec;
    }
    #odeslatPojistence(){
        Ajax.post("http://localhost:5500/api/pojistenec", this.#vytvoritDataObj())
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) });
    }
    spustit(){
        this.#ulozitTl.onclick = () => {
            this.#odeslatPojistence();
            if(!this.#kontrola().some(e => e === false)){
                if(this.#adresy['password_II'].rovno(this.#adresy['password'].hodnota, "Hesla nejsou stejná"))    return;
                this.#odeslatPojistence();
            }
        };
    }
}