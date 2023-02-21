'use strict';

import { Validace } from "./Validace.js";

const privatni = new WeakMap();
export class PridatPojistence{
    constructor(){
        privatni.set(this, {
            _ulozitTlacitko: document.querySelector('#ulozitPojistence'),

            _inputJmeno: document.querySelector('#poj_jmeno'),
            _errJmeno: document.querySelector('#er-Jmeno'),

            _inputPrijmeni: document.querySelector('#poj_prijmeni'),
            _errPrijmeni: document.querySelector('#er-Prijmeni'),

            _inputEmail: document.querySelector('#poj_email'),
            _errEmail: document.querySelector('#er-Email'),

            _inputTelefon: document.querySelector('#poj_telefon'),
            _errTelefon: document.querySelector('#er-Telefon'),

            _inputUlice: document.querySelector('#poj_ulice'),
            _errUlice: document.querySelector('#er-Ulice'),

            _inputMesto: document.querySelector('#poj_mesto'),
            _errMesto: document.querySelector('#er-Mesto'),

            _inputPsc: document.querySelector('#poj_psc'),
            _errPsc: document.querySelector('#er-Psc'),

            _pojistenec: {},

            _zaplnitPojistence: function(){
                this._pojistenec.jmeno = this._inputJmeno.value;
                this._pojistenec.prijmeni = this._inputPrijmeni.value;
                this._pojistenec.email = this._inputEmail.value;
                this._pojistenec.telefon = this._inputTelefon.value;
                this._pojistenec.ulice = this._inputUlice.value;
                this._pojistenec.mesto = this._inputMesto.value;
                this._pojistenec.psc = this._inputPsc.value;
                
                this._zvalidovat();
            },
            _zvalidovat: function(){
               const response = Validace.zvalidovat(this._pojistenec);
               this._zpracovatValidaci(response);
            },
            _zpracovatValidaci: function(response){
                console.log(response);
                if(response.status) this._odeslat();
                else{
                    if(response.jmeno){
                        this._errJmeno.style.display = "block";
                        this._errJmeno.textContent = response.jmeno;
                    }
                    if(response.prijmeni){
                        this._errPrijmeni.style.display = "block";
                        this._errPrijmeni.textContent = response.prijmeni;
                    }
                    if(response.email){
                        this._errEmail.style.display = "block";
                        this._errEmail.textContent = response.email;
                    }
                    if(response.telefon){
                        this._errTelefon.style.display = "block";
                        this._errTelefon.textContent = response.telefon;
                    }
                    if(response.ulice){
                        this._errUlice.style.display = "block";
                        this._errUlice.textContent = response.ulice;
                    }
                    if(response.mesto){
                        this._errMesto.style.display = "block";
                        this._errMesto.textContent = response.mesto;
                    }
                    if(response.psc){
                        this._errPsc.style.display = "block";
                        this._errPsc.textContent = response.psc;
                    }
                }
            },
            _odeslat(){
                console.log(this._pojistenec);
            }
        });
    }
    spustit(){
        privatni.get(this)._ulozitTlacitko.onclick = () => {
            privatni.get(this)._zaplnitPojistence();
        }
    }
}