'use strict';

import { Ajax } from "./Ajax.js";
import { VypisovacPojistence } from "./VypisovacPojistence.js";
import { PridavacPojisteni } from "./PridavacPojisteni.js";

const privatni = new WeakMap();
export class ObsluhaDetailStranky{
    constructor(id){
        privatni.set(this, {
            _id: id,
            _data: {},
            _vypis: new VypisovacPojistence(),
            _pridatPojisteni: new PridavacPojisteni(),

            _ziskatPojistence: function(){
                Ajax.get(`http://localhost:5500/api/pojistenec/${this._id}`, { pocet: 5 })
                .then((data) => {
                    this._data = data;
                    this._zpracovatData();
                })
                .catch((err) => console.log(err)) 
            },
            _zpracovatData: function(){
                this._vypis.vypsatPojistence(this._data);
            }
        });
    }
    spustit(){
        privatni.get(this)._ziskatPojistence();
    }
}