'use strict';

import { Vlastnosti } from "./Vlastnosti.js";

export class VlastnostiPojisteni extends Vlastnosti{
    #vlastnost;
    #adresa;
    constructor(vlastnost, adresa){
        super(vlastnost, adresa);   
    }
    get maPojisteni(){
        return this.info.length > 0;
    }
}