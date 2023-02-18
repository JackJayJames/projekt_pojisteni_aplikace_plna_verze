'use strict';

import { Ajax } from "./Ajax.js";
import { TvoricTabulky } from "./TvoricTabulky.js";
const privatni = new WeakMap();

export class ObsluhaHlStranky{
    constructor(){
        privatni.set(this, {
            _tabulka: new TvoricTabulky(document.querySelector(".container")),
            _data: [],

            _getPojistence: function(){
                Ajax.get('http://localhost:5500/api/pojistenci', { pocet: 5 })
                    .then((data) => {
                        this._data = data;
                        this._vykreslitPojistence();
                    })
                    .catch((err) => console.log(err)) 
            },
            _deletePojistence: function(id){
                Ajax.delete(`http://localhost:5500/api/pojistenec/${id}`)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => console.log(err));
            },
            _vykreslitPojistence: function(){
                console.log(this._data);
                this._tabulka.vytvorit(this._data);
                this._obsluhaDeleteTlacitek();
            },
            _obsluhaDeleteTlacitek: function(){
                for(const pojistenec of this._data){
                    document.getElementById(pojistenec._id).onclick = (e) => {
                        console.log(e.target.id);
                        this._deletePojistence(e.target.id);
                    };
                }
            }
        });
        this.vypsatPojistence()
    }
    vypsatPojistence(){
        privatni.get(this)._getPojistence();
    }
}