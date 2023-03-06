'use strict';

import { Ajax } from "./Ajax.js";

const privatni = new WeakMap();
export class ObsluhaDetailStranky{
    constructor(id){
        privatni.set(this, {
            _id: id,

            _ziskatPojistence: function(){
                Ajax.get(`http://localhost:5500/api/pojistenec/${this._id}`, { pocet: 5 })
                .then((data) => {
                    this._data = data;
                    console.log(this._data);
                })
                .catch((err) => console.log(err)) 
            }
        });
    }
    spustit(){
        privatni.get(this)._ziskatPojistence();
    }
}