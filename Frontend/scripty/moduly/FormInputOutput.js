'use strict';

import { Validace } from "./Validace.js";

export class FormInputOutput{
    #input;
    #err;
    #validace;
    constructor(input, err, validace){
        this.#input = input;
        this.#err = err;
        this.#validace = validace;
    }
    get validni(){
        const validace = this.#validace(this.#input.value);
        if(validace){
            this.#vypsatChybuValidace(validace);
            return false;
        }
        this.#schovatChybuValidace();
        return true;
    }
    #vypsatChybuValidace(error){
        console.log(error);
        this.#err.textContent = error;
        this.#err.style.display = "block";
    }
    #schovatChybuValidace(){
        this.#err.style.display = "none";
    }
}