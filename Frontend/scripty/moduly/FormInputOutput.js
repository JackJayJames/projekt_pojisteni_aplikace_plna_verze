'use strict';

export class FormInputOutput{
    #input;
    #err;
    constructor(input, err){
        this.#input = input;
        this.#err = err;
    }
    zapsat(){
        this.#input.value = "ano";
        this.#err.textContent = "ano";
    }
}