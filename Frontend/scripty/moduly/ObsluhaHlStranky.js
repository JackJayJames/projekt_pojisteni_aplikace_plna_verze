'use strict';

import { Ajax } from "./Ajax.js";
const privatni = new WeakMap();

export class ObsluhaHlStranky{
    constructor(){
        this.content = document.querySelector();


        privatni.set(this, {
            _getPojistence: function(){
                Ajax.get('http://localhost:3000/api/pojistenci', { pocet: 5 })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => console.log(err)) 
            }
        });
        this.ziskatPojistence()
    }
    ziskatPojistence(){
        privatni.get(this)._getPojistence();
    }
    vykreslitPojistence(){

    }
}