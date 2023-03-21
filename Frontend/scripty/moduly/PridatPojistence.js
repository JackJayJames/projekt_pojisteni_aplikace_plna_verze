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
        this.#fetchWrapper("http://localhost:5500/api/pojistenec/", this.#vytvoritDataObj(), 'POST')
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
    }
    async #fetchWrapper(adresa = "", obj = {}, type = ""){
        const result = fetch(adresa, {
            methon: type,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(obj)
        });

        return result;
    }
    spustit(){
        this.#ulozitTl.onclick = () => {
            if(!this.#kontrola().some(e => e === false)){
                if(this.#adresy['password_II'].rovno(this.#adresy['password'].hodnota, "Hesla nejsou stejná"))    return;
                this.#odeslatPojistence();
            }
        };
    }
}