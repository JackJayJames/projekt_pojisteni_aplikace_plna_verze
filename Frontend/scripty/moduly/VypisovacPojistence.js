'use strict';

const privatni = new WeakMap();
export class VypisovacPojistence{
    constructor(){
        privatni.set(this, {
            _jmeno: document.querySelector("#jmeno"),
            _prijmeni: document.querySelector("#prijmeni"),
            _narozeni: document.querySelector("#narozeni"),
            _mail: document.querySelector("#mail"),
            _telefon: document.querySelector("#telefon"),
            _ulice: document.querySelector("#ulice"),
            _mesto: document.querySelector("#mesto"),
            _psc: document.querySelector("#psc"),

            _vypsatPojistence: function(pojistenec){
                this._jmeno.textContent = pojistenec.jmeno;
                this._prijmeni.textContent = pojistenec.prijmeni;
                this._narozeni.textContent = new Date(pojistenec.narozeni).toLocaleDateString();
                this._mail.textContent = pojistenec.mail;
                this._telefon.textContent = pojistenec.telefon;
                this._ulice.textContent = pojistenec.ulice;
                this._mesto.textContent = pojistenec.mesto;
                this._psc.textContent = pojistenec.psc;
            }
        });
    }
    vypsatPojistence(pojistenec){
        privatni.get(this)._vypsatPojistence(pojistenec);
    }
}