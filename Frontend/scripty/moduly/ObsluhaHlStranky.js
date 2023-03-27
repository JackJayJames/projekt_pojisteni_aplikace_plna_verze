'use strict';

import { Ajax } from "./Ajax.js";
import { PopUp } from "../moduly/PopUp.js";

export class ObsluhaHlStranky{
<<<<<<< Updated upstream
    constructor(){
        
=======
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
            console.log(form);
            validationResults.push(this.#login[form].validni);
        }
        console.log(validationResults);
        return true;
    }
    spustit(){
        this.#loginBtn.onclick = () => {
            if(this.#validaceLogin())    return this.#popUp.error('Invalidni Login', 123456789);
        };
>>>>>>> Stashed changes
    }
}