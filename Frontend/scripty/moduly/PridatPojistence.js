'use strict';

import { Ajax } from "./Ajax.js";
import { PopUp } from "./PopUp.js";

export class PridatPojistence{
    #adresy;
    #ulozitTl;
    constructor(adresy, ulozitTl){
        this.#adresy = adresy;
        this.#ulozitTl = ulozitTl;
        this.#popup = new PopUp();
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
    #prepnoutNaDetail(id, ticket){
        localStorage.setItem('pojistenec_id', id);
        localStorage.setItem('ticket_id', ticket);
        //window.location.replace('./detail.html');
    }
    #odeslatPojistence(){
        Ajax.post("http://localhost:5500/api/pojistenec", this.#vytvoritDataObj())
            .then(res => { this.#prepnoutNaDetail(res.pojistenec._id, res.ticket) })
            .catch(err => { console.log(err) });
    }
    spustit(){
        this.#ulozitTl.onclick = () => {
            if(!this.#kontrola().some(e => e === false)){
                if(!this.#adresy['password_II'].rovno(this.#adresy['password'].hodnota, "Hesla nejsou stejná"))    return;
                this.#odeslatPojistence();
            }
        };
    }
}