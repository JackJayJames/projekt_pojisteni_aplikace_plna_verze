'use strict';

import { Pojisteni } from "./Pojisteni.js";

const privatni = new WeakMap();
export class PridavacPojisteni{
    constructor(){
        privatni.set(this, {
            _nazev: document.querySelector("#nazev"),
            _castka: document.querySelector("#castka"),
            _predmet: document.querySelector("#predmet"),
            _platnost: document.querySelector("#platnost")
        });
    }
    pridat(){
        console.log(privatni.get(this)._platnost);
    }
}