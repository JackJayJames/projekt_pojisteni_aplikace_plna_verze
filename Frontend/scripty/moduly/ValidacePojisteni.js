'use strict';

export class ValidacePojisteni{
    static #_vysledek;

    static zvalidovat(pojisteni){
        this.#_vysledek = { status: true };

        this.#_validaceNazvu(pojisteni.nazev);

        return this.#_vysledek;
    }
    static #_validaceNazvu(nazev){
        if(!nazev){
            this.#_vysledek.status = false;
            this.#_vysledek.nazev = "Toto pole je poviné";
            return;
        }
        if(nazev.length < 3){
            this.#_vysledek.status = false;
            this.#_vysledek.nazev = "Příliš krátké";
        }
        if(nazev.length > 20){
            this.#_vysledek.status = false;
            this.#_vysledek.nazev = "Příliš dlouhé";
        }
        if(this.#_jenomPismena(nazev)){
            this.#_vysledek.status = false;
            this.#_vysledek.nazev = "Může obsahovat jenom písmena";
        }
    }

    static #_jenomPismena(str){
        return !/^[A-Za-zÁ-Žá-ž]*$/.test(str);
    }
}