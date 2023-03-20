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
            console.log(validace);
            return false;
        }
        return true;
    }
}