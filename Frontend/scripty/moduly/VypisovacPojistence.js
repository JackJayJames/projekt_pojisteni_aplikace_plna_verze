'use strict';

const privatni = new WeakMap();
export class VypisovacPojistence{
    constructor(){
        privatni.set(this, {
            _jmeno: document.querySelector("#jmeno"),
            _prijmeni: document.querySelector("#prijmeni"),
            _narozeni: document.querySelector("narozeni"),
            _mail: document.querySelector("#mail"),
            _telefon: document.querySelector("#telefon"),
            _ulice: document.querySelector("#ulice"),
            _mesto: document.querySelector("#mesto"),
            _psc: document.querySelector("#psc"),

            _vypsatPojistence: function(pojistenec){
                
            }
        });
    }
    vypsatPojistence(pojistenec){
        privatni.get(this)._vypsatPojistence(pojistenec);
    }
}