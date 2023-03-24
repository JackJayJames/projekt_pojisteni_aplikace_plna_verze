'use strict';

import { Vlastnosti } from "./Vlastnosti.js";

export class VlastnostiPojisteni extends Vlastnosti{
    #vlastnost;
    #adresa;
    constructor(vlastnost, adresa){
        super(vlastnost, adresa);
        console.log(vlastnost);
    }
    get maPojisteni(){
        console.log(this.#vlastnost);
    }
}