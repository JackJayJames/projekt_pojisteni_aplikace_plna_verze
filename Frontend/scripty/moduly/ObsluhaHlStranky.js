'use strict';

import { Ajax } from "./Ajax.js";
import { TvoricTabulky } from "./TvoricTabulky.js";
const privatni = new WeakMap();

export class ObsluhaHlStranky{
    constructor(){
        privatni.set(this, {
            _tabulka: new TvoricTabulky(document.querySelector(".container")),

            _getPojistence: function(){
                Ajax.get('http://localhost:3000/api/pojistenci', { pocet: 5 })
                    .then((data) => {
                        this._vykreslitPojistence(data);
                    })
                    .catch((err) => console.log(err)) 
            },
            _vykreslitPojistence: function(data){
                this._tabulka.vytvorit(data);
            }
        });
        this.vypsatPojistence()
    }
    vypsatPojistence(){
        privatni.get(this)._getPojistence();
    }
}