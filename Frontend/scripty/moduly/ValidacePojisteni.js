'use strict';

export class ValidacePojisteni{
    static #_vysledek;

    static zvalidovat(pojisteni){
        this.#_vysledek = { status: true };

        this.#_vysledek.nazev = this.#_validaceNazvu(pojisteni.nazev);
        this.#_vysledek.predmet = this.#_validaceNazvu(pojisteni.predmet);

        return this.#_vysledek;
    }
    static #_validaceNazvu(nazev){
        if(!nazev){
            this.#_vysledek.status = false;
            return "Toto pole je poviné";
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

    static #_jenomPismena(str){
        return !/^[A-Za-zÁ-Žá-ž]*$/.test(str);
    }
}