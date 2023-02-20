'use strict';

export class Validace{
    static #response;

    static zvalidovat(pojistenec){
        this.#response = { status: "OK" };
        this.#response.jmeno = this.#zvalidovatJmeno(pojistenec.jmeno);
        console.log(this.#response);
        return this.#response;
    }
    static #zvalidovatJmeno(jmeno){
        if(!jmeno){
            this.#response.status = "notOK";
            return "Toto pole je povinné";
        }
        if(!this.#delka(jmeno, 2, 30)){
            this.#response.status = "notOK";
            return "Délka musí být delší než 1 a kratší než 31";
        }
    }

    static #delka(input, min, max){
        return (min <= input.length) && (input.length <= max);
    }
}