'use strict';

const privatni = new WeakMap();
export class PridatPojistence{
    constructor(){
        privatni.set(this, {
            _ulozitTlacitko: document.querySelector('#ulozitPojistence'),

            _inputJmeno: document.querySelector('#poj_jmeno'),
            _errJmeno: document.querySelector('#er-Jmeno'),

            _inputPrijmeni: document.querySelector('#poj_prijmeni'),
            _errPrijmeni: document.querySelector('#er-Prijmeni'),

            _inputEmail: document.querySelector('#poj_email'),
            _errEmail: document.querySelector('#er-Email'),

            _inputTelefon: document.querySelector('#poj_telefon'),
            _errTelefon: document.querySelector('#er-Telefon'),

            _inputUlice: document.querySelector('#poj_ulice'),
            _errUlice: document.querySelector('#er-Ulice'),

            _inputMesto: document.querySelector('#poj_mesto'),
            _errMesto: document.querySelector('#er-Mesto'),

            _inputPsc: document.querySelector('#poj_psc'),
            _errPsc: document.querySelector('#er-Psc')
        });
    }
    spustit(){
        privatni.get(this)._ulozitTlacitko.onclick = () => {
            console.log(this);
        }
    }
}