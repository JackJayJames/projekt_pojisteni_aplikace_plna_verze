'use strict';

import { Ajax } from "./Ajax.js";
import { VypisovacPojistence } from "./VypisovacPojistence.js";

const privatni = new WeakMap();
export class ObsluhaDetailStranky{
    constructor(id){
        privatni.set(this, {
            _id: id,
            _data: {},

            _ziskatPojistence: function(){
                Ajax.get(`http://localhost:5500/api/pojistenec/${this._id}`, { pocet: 5 })
                .then((data) => {
                    this._data = data;
                    this._zpracovatData();
                })
                .catch((err) => console.log(err)) 
            },
            _zpracovatData: function(){
                console.log(this._data);
            }
        });
    }
    spustit(){
        privatni.get(this)._ziskatPojistence();
    }
}