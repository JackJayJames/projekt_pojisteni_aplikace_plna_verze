'use strict';

export class Validace{
    static #_response;

    static zvalidovat(pojistenec){
        this.#_response = { status: "OK" };
        this.#_response.jmeno = this.#_zvalidovatJmeno(pojistenec.jmeno);
        this.#_response.prijmeni = this.#_zvalidovatJmeno(pojistenec.prijmeni);
        console.log(this.#_response);
        return this.#_response;
    }
    static #_zvalidovatJmeno(jmeno){
        if(!jmeno){
            this.#_response.status = "notOK";
            return "Toto pole je povinné";
        }
        if(!this.#_delka(jmeno, 2, 30)){
            this.#_response.status = "notOK";
            return "Délka musí být delší než 1 a kratší než 31";
        }
        if(!this.#_jednoSlovo(jmeno)){
            this.#_response.status = "notOK";
            return "Musí obsahovat jedno slovo";
        }
    }

    static #_delka(input, min, max){
        return (min <= input.length) && (input.length <= max);
    }
    static #_jednoSlovo(slovo){
        return slovo.trim().split(" ").length == 1;
    }
}