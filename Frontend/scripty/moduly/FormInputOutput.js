'use strict';

import { Validace } from "./Validace.js";

export class FormInputOutput{
    #input;
    #err;
    #validace;
    constructor(input, err, validace){
        this.#input = input;
        this.#err = err;
        this.#validace = validace.bind(Validace);
    }
    get validni(){
        const validace = this.#validace(this.hodnota);
        if(validace){
            this.#vypsatChybuValidace(validace);
            return false;
        }
        this.#schovatChybuValidace();
        return true;
    }
    get hodnota(){
        return this.#input.value;
    }
    rovno(cmp, mess = ""){
        if(cmp !== this.hodnota){
            this.#vypsatChybuValidace(mess);
            return false;
        }
        this.#schovatChybuValidace();
        return true;
    }
    #vypsatChybuValidace(error){
        this.#err.textContent = error;
        this.#err.style.display = "block";
    }
    #schovatChybuValidace(){
        this.#err.style.display = "none";
    }
}