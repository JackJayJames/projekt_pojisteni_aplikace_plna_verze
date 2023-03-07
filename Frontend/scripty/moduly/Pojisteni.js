'use strict';

export class Pojisteni{
    constructor(nazev, castka, predmet, platnost_od, platnost_do){
        this.nazev = nazev;
        this.castka = castka;
        this.predmet = predmet;
        this.platnost_od = platnost_od;
        this.platnost_do = platnost_do;
    }
}