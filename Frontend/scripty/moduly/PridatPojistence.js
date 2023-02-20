'use strict';

const privatni = new WeakMap();
export class PridatPojistence{
    constructor(){
        privatni.set(this, {
            _ulozitTlacitko: document.querySelector("#ulozitPojistence"),
        });
    }
    spustit(){
        privatni.get(this)._ulozitTlacitko.onclick = () => {
            console.log(this);
        }
    }
}