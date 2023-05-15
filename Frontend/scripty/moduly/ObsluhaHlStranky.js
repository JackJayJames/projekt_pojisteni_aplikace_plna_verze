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
        Ajax.post('http://localhost:5500/api/login', { username: this.#login.username.hodnota, password: this.#login.password.hodnota })
            .then(res => {
                localStorage.setItem('pojistenec_id', res.pojistenec);
                localStorage.setItem('ticket_id', res.ticketID);
                window.location.replace('./detail.html');
            })
            .catch(err => {
                if(err.status === 401)  this.#popUp.error("Špatné uživalské jméno nebo heslo", 123456789);
                if(err.status === 404)  this.#popUp.error("Chyba", 987564321);
                if(err.status === 400)  this.#popUp.error("Invalidní formát jména nebo hesla", 654123789);
            });
    }
    spustit(){
        this.#loginBtn.onclick = () => {
            if(this.#validaceLogin().some(e => e === false)){
                this.#popUp.error('Invalidni Login', 123456789);
                
            } else{
                this.#odeslatLogin();
            }
        };
    }
}