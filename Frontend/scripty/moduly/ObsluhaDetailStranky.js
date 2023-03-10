'use strict';

import { Ajax } from "./Ajax.js";
import { VypisovacPojistence } from "./VypisovacPojistence.js";
import { PridavacPojisteni } from "./PridavacPojisteni.js";
import { PopUp } from "./PopUp.js";

const privatni = new WeakMap();
export class ObsluhaDetailStranky{
    constructor(id){
        privatni.set(this, {
            _id: id,
            _data: {},
            _pojisteniTlacitko: document.querySelector("#addPoj"),
            _vypis: new VypisovacPojistence(),
            _pridatPojisteni: new PridavacPojisteni(),

            _ziskatPojistence: function(){
                Ajax.get(`http://localhost:5500/api/pojistenec/${this._id}`, { pocet: 5 })
                .then((data) => {
                    this._data = data;
                    this._vypis.vypsatPojistence(this._data);
                    this._zpracovatData();

                })
                .catch((err) => console.log(err)) 
            },
            _zpracovatData: function(){
                console.log(this._data.pojisteni);
                this._vypis.smazatPojisteni(this._data.pojisteni.length);
                for(const pojisteni of this._data.pojisteni){
                    Ajax.get(`http://localhost:5500/api/pojisteni/${pojisteni}`, { pocet: 5 })
                    .then((res) => {
                        this._vypis.vypsatPojisteni(res);
                        
                        const delBtn = document.getElementById(pojisteni);
                        delBtn.onclick = (e) => {
                            //if(!confirm("Jste si jistý že chcete smazat toto pojištění?")) return;
                            
                            PopUp.success("Pojištění úspěšně smazáno", pojisteni);

                            /*
                            fetch(`http://localhost:5500/api/pojisteni/${e.target.id}`, {
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
                                    this._ziskatPojistence();
                                })
                                .catch(err => console.log(err));
                            */
                        };
                    })
                    .catch((err) => console.log(err))
                }
            },
            
            _pridavaciTlacitko: function(){
                this._pojisteniTlacitko.onclick = () => {
                    const pojisteni =  this._pridatPojisteni.pridat();
                    
                    if(!pojisteni){
                        console.log("Chyba");
                        return;
                    }
                    this._odeslatPojisteni(pojisteni);
                }
            },
            _odeslatPojisteni: function(pojisteni){
                fetch(`http://localhost:5500/api/pojisteni/${this._data._id}`,{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    method: "POST",
                    body: JSON.stringify(pojisteni)
                })
                .then(() => this._ziskatPojistence())
                .catch(err => console.log(err));
            }
        });
    }
    spustit(){
        privatni.get(this)._ziskatPojistence();
        privatni.get(this)._pridavaciTlacitko();
    }
}