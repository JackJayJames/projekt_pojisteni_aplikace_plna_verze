'use strict';

import { Ajax } from "./Ajax.js";
import { PopUp } from "./PopUp.js";

export class ObsluhaDetailStranky{
    #userData;
    #infoVystup;
    #formPojisteni;
    constructor(userData, infoVystup, formPojisteni){
        this.#userData = userData;
        this.#infoVystup = infoVystup;
        this.#formPojisteni = formPojisteni;
    }
    #vypsatInfo(){
        for(const info in this.#infoVystup){
            if(info === "pojisteni") continue;
            this.#infoVystup[info].vypsat();
        }
    }
    spustit(){
        this.#vypsatInfo();
    }

    static prepnoutNaLogin(){
        window.location.replace('./index.html');
    }
}