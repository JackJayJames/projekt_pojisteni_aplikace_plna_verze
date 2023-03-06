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
                fetch(`http://localhost:5500/api/pojistenec/${id}`, {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: "",
                })
                    .then(res => {
                        this._getPojistence();
                    })
                    .catch(err => console.log(err));
            },
            _vykreslitPojistence: function(){
                this._tabulka.vytvorit(this._data);
                this._obsluhaDeleteTlacitek();
                this._obsluhaDetailu();
            },
            _obsluhaDeleteTlacitek: function(){
                for(const pojistenec of this._data){
                    document.getElementById(pojistenec._id).onclick = (e) => {
                        this._deletePojistence(e.target.id);
                    };
                }
            },
            _obsluhaDetailu: function(){
                const pojistenci = document.querySelectorAll('.pojJmeno');
                for(const pojistenec of pojistenci){
                    pojistenec.onclick = (e) => {
                        console.log(e.target.id.replace("poj-", ""));
                        window.location.href = "./detail.html";
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