'use strict';

export class Pojisteni{
    constructor(nazev, castka, predmet, platnost){
        this.nazev = nazev;
        this.castka = castka;
        this.predmet = platnost;
        this.platnost_od = new Date.now();
        this.platnost_do = platnost;
    }
}