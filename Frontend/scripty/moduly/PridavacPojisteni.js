'use strict';

import { Pojisteni } from "./Pojisteni.js";

const privatni = new WeakMap();
export class PridavacPojisteni{
    constructor(){
        privatni.set(this, {
            _nazev: document.querySelector("#nazev"),
            _castka: document.querySelector("#castka"),
            _predmet: document.querySelector("#predmet"),
            _platnost: document.querySelector("#platnost"),

            _pojisteni: {},
            
            _vytvoritPojisteni: function(){
                const d = new Date();
                return this._pojisteni = new Pojisteni(this._nazev.value, this._castka.value, this._predmet.value, `${d.getFullYear()}-${d.getMonth()+1 < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`, this._platnost.value);
            }
        });
    }
    pridat(){
        console.log(privatni.get(this)._platnost);
        return privatni.get(this)._vytvoritPojisteni();
    }
}