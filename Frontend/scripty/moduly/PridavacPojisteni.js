'use strict';

import { Pojisteni } from "./Pojisteni.js";
import { ValidacePojisteni } from "./ValidacePojisteni.js";

const privatni = new WeakMap();
export class PridavacPojisteni{
    constructor(){
        privatni.set(this, {
            _nazev: document.querySelector("#nazev"),
            _castka: document.querySelector("#castka"),
            _predmet: document.querySelector("#predmet"),
            _platnost: document.querySelector("#platnost"),

            _valNazev: document.querySelector("#valNazev"),
            _valCastka: document.querySelector("#valCastka"),
            _valPredmet: document.querySelector("#valPredmet"),
            _valPlatnost: document.querySelector("#valPlatnost"),

            _pojisteni: {},
            
            _vytvoritPojisteni: function(){
                const d = new Date();
                this._pojisteni = new Pojisteni(this._nazev.value, this._castka.value, this._predmet.value, `${d.getFullYear()}-${d.getMonth()+1 < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`, this._platnost.value);
                const validace = this._zvalidovat();
                
            },
            _zvalidovat: function(){
                const result = ValidacePojisteni.zvalidovat(this._pojisteni);
                if(result.status) return this._odeslatPojisteni();
                else    return this._zpracovatValidaci(result);
            },
            _zpracovatValidaci: function(result){
                if(result.nazev){
                    this._valNazev.style.display = "block";
                    this._valNazev.textContent = result.nazev;
                }
                if(result.castka){
                    this._valCastka.style.display = "block";
                    this._valCastka.textContent = result.castka;
                }
                if(result.predmet){
                    this._valPredmet.style.display = "block";
                    this._valPredmet.textContent = result.predmet;
                }
                if(result.platnost_do){
                    this._valPlatnost.style.display = "block";
                    this._valPlatnost.textContent = result.platnost_do;
                }
            }
        });
    }
    pridat(){
        console.log(privatni.get(this)._platnost);
        return privatni.get(this)._vytvoritPojisteni();
    }
}