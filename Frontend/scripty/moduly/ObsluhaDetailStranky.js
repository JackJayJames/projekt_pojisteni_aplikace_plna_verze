'use strict';

import { Ajax } from "./Ajax.js";
import { Pojisteni } from "./Pojisteni.js";
import { PopUp } from "./PopUp.js";

export class ObsluhaDetailStranky{
    #userData;
    #infoVystup;
    #formPojisteni;
    #submitTl;
    constructor(userData, infoVystup, formPojisteni, submitTl){
        this.#userData = userData;
        this.#infoVystup = infoVystup;
        this.#formPojisteni = formPojisteni;
        this.#submitTl = submitTl;
    }
    #vypsatInfo(){
        for(const info in this.#infoVystup){
            if(info === "pojisteni") continue;
            this.#infoVystup[info].vypsat();
        }
    }
    #kontrola(){
        const validace = [];
        for(const input in this.#formPojisteni){
            validace.push(this.#formPojisteni[input].validni);
        }
        return validace;
    }
    #odeslatPojisteni(){
        const pojisteni = new Pojisteni(this.#formPojisteni.nazev.hodnota, this.#formPojisteni.castka.hodnota,
                         this.#formPojisteni.predmet.hodnota, new Date(Date.now()).toString(), this.#formPojisteni.platnost.hodnota);
        console.log(pojisteni);
    }
    spustit(){
        this.#vypsatInfo();
        this.#submitTl.onclick = () => {
            if(!this.#kontrola().some(e => e === false)){
                this.#odeslatPojisteni();
            }
        };
        console.log(this.#infoVystup["pojisteni"].maPojisteni);
    }

    static prepnoutNaLogin(){
        window.location.replace('./index.html');
    }
}