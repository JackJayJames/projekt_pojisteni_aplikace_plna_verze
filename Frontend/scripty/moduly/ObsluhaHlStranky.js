'use strict';

import { Ajax } from "./Ajax.js";
const privatni = new WeakMap();

export class ObsluhaHlStranky{
    constructor(){
        privatni.set(this, {

        });
        this.test();
    }
    test(){
        Ajax.get('https://localhost:3000/api/pojistenci', { pocet: 5 })
            .then((data) => {
                console.log("Data přijata")
                console.log(data);
            })
            .catch((err) => console.log(err))
    }
}