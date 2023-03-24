'use strict';

import { Ajax } from "./Ajax.js";
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
            console.log(this.#formPojisteni[input].validni);
            validace.push(this.#formPojisteni[input].validni);
        }
        return validace;
    }
    spustit(){
        this.#vypsatInfo();
        this.#submitTl.onclick = () => {
            if(!this.#kontrola().some(e => e === false)){
                console.log("validni");
            } else {
                console.log("nevalidní");
            }
        };
        console.log(this.#infoVystup["pojisteni"].maPojisteni);
    }

    static prepnoutNaLogin(){
        window.location.replace('./index.html');
    }
}