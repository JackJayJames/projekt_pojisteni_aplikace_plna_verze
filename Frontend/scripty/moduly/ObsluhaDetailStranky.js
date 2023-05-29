'use strict';

import { Ajax } from "./Ajax.js";
import { Pojisteni } from "./Pojisteni.js";
import { PopUp } from "./PopUp.js";
import { TvoricTabulky } from "./TvoricTabulky.js";

export class ObsluhaDetailStranky{
    #userData;
    #infoVystup;
    #formPojisteni;
    #submitTl;
    #poj_Tabulka;
    constructor(userData, infoVystup, formPojisteni, submitTl){
        this.#userData = userData;
        this.#infoVystup = infoVystup;
        this.#formPojisteni = formPojisteni;
        this.#submitTl = submitTl;
        this.#poj_Tabulka = new TvoricTabulky(".pojisteni");
    }
    #vypsatInfo(){
        for(const info in this.#infoVystup){
            if(info === "pojisteni") continue;
            this.#infoVystup[info].vypsat();
        }
        if(!this.#infoVystup['pojisteni'].info.length){
            const poj_sp = document.querySelector('.pojisteni');
            poj_sp.innerHTML = "Žádná pojištění";
            return;
        }
        for(const pojisteni of this.#infoVystup['pojisteni'].info){
            this.#ziskatPojisteni(pojisteni);
        }
    }
    #kontrola(){
        const validace = [];
        for(const input in this.#formPojisteni){
            validace.push(this.#formPojisteni[input].validni);
        }
        return validace;
    }
    #ziskatPojisteni(pojisteni){
        Ajax.get(`http://localhost:5500/api/pojisteni/${pojisteni}/${this.#userData.pojistenec_id}/${this.#userData.ticket_id}`)
        .then(res => {
            this.#poj_Tabulka.pridat(res);
        })
        .catch(err => {
            PopUp.error(`Chyba ${err.status} - ${err.text}`);
        })
    }

    #odeslatPojisteni(){
        const pojisteni = new Pojisteni(this.#formPojisteni.nazev.hodnota, this.#formPojisteni.castka.hodnota,
                         this.#formPojisteni.predmet.hodnota, new Date(Date.now()).toString(), this.#formPojisteni.platnost.hodnota);
        
        Ajax.post(`http://localhost:5500/api/pojisteni/${this.#userData.pojistenec_id}/${this.#userData.ticket_id}`, pojisteni)
        .then(res => {
            location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }
    spustit(){
        this.#vypsatInfo();
        this.#submitTl.onclick = () => {
            if(!this.#kontrola().some(e => e === false)){
                this.#odeslatPojisteni();
            }
        };
    }

    static prepnoutNaLogin(){
        window.location.replace('./index.html');
    }
}