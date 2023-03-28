'use strict';

import { Ajax } from "./Ajax.js";
import { PopUp } from "../moduly/PopUp.js";

export class ObsluhaHlStranky{
    #login;
    #loginBtn;
    #popUp;
    constructor(login, button){
        this.#login = login;   
        this.#loginBtn = button;
        this.#popUp = new PopUp(document.querySelector('.container'));
    }
    #validaceLogin(){
        const validationResults = [];
        for(const form in this.#login){
            validationResults.push(this.#login[form].validni);
        }
        return validationResults;
    }
    #odeslatLogin(){
        console.log("login");
    }
    spustit(){
        this.#loginBtn.onclick = () => {
            if(!this.#validaceLogin().some(e => e === false)){
                this.#popUp.error('Invalidni Login', 123456789);
                this.#odeslatLogin();
            }
        };
    }
}