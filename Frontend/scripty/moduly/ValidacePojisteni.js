'use strict';

export class ValidacePojisteni{
    static #_vysledek;

    static zvalidovat(pojisteni){
        this.#_vysledek = { status: true };

        this.#_vysledek.nazev = this.#_validaceNazvu(pojisteni.nazev);
        this.#_vysledek.castka = this.#_validaceCastky(pojisteni.castka);
        this.#_vysledek.predmet = this.#_validaceNazvu(pojisteni.predmet);
        this.#_vysledek.platnost_do = this.#_validaceDatumu(pojisteni.platnost_do);

        return this.#_vysledek;
    }
    static #_validaceNazvu(nazev){
        if(!nazev){
            this.#_vysledek.status = false;
            return "Toto pole je povinné";
        }
        if(nazev.length < 3){
            this.#_vysledek.status = false;
            return "Příliš krátké";
        }
        if(nazev.length > 20){
            this.#_vysledek.status = false;
            return "Příliš dlouhé";
        }
        if(this.#_jenomPismena(nazev)){
            this.#_vysledek.status = false;
            return "Může obsahovat jenom písmena";
        }
    }
    static #_validaceCastky(castka){
        if(!castka){
            this.#_vysledek.status = false;
            return "Toto pole je povinné";
        }
        if(Number(castka) <= 0){
            this.#_vysledek.status = false;
            return "Číslo musí být větší než 0";
        }
        if(this.#_jenomCisla(castka)){
            this.#_vysledek.status = false;
            return "Může obsahovat jenom čísla";
        }
    }
    static #_validaceDatumu(datum){
        if(!datum){
            this.#_vysledek.status = false;
            return "Toto pole je povinné";
        }
        if(this.#_vBudoucnu(datum)){
            this.#_vysledek.status = false;
            return "Datum je v minulosti";
        }
    }

    static #_jenomPismena(str){
        return !/^[A-Za-zÁ-Žá-ž ]*$/.test(str);
    }
    static #_jenomCisla(cislo){
        return !/^[0-9]*$/.test(cislo);
    }
    static #_vBudoucnu(datum){
        return new Date(datum) < Date.now();
    }
}