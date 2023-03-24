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
    spustit(){
        this.#vypsatInfo();
        this.#infoVystup["pojisteni"].maPojisteni;
    }

    static prepnoutNaLogin(){
        window.location.replace('./index.html');
    }
}