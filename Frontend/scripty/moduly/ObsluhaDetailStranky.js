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

    spustit(){
        console.log("detail");
    }

    static prepnoutNaLogin(){
        window.location.replace('./index.html');
    }
}