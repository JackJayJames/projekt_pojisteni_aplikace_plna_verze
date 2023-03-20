'use strict';

import { PridatPojistence } from "../moduly/PridatPojistence.js";
import { FormInputOutput } from "../moduly/FormInputOutput.js";
import { Validace } from "../moduly/Validace.js";

const adresy = {
    username: new FormInputOutput(document.querySelector('#poj_username'), document.querySelector('#er-Username'), Validace.zvalidovatJmeno),
    password_I: new FormInputOutput(document.querySelector('#poj_password'), document.querySelector('#er-Password')),
    password_II: new FormInputOutput(document.querySelector('#poj_passwordII'), document.querySelector('#er-PasswordII')),
    jmeno: new FormInputOutput(document.querySelector('#poj_jmeno'), document.querySelector('#er-Jmeno')),
    prijmeni: new FormInputOutput(document.querySelector('#poj_prijmeni'), document.querySelector('#er-Prijmeni')),
    email: new FormInputOutput(document.querySelector('#poj_email'), document.querySelector('#er-Email')),
    telefon: new FormInputOutput(document.querySelector('#poj_telefon'), document.querySelector('#er-Telefon')),
    ulice: new FormInputOutput(document.querySelector('#poj_ulice'), document.querySelector('#er-Ulice')),
    mesto: new FormInputOutput(document.querySelector('#poj_mesto'), document.querySelector('#er-Mesto')),
    narozeni: new FormInputOutput(document.querySelector('#poj_narozeni'), document.querySelector('#er-Narozeni')),
    psc: new FormInputOutput(document.querySelector('#poj_psc'), document.querySelector('#er-Psc'))
};

const pridatPojistence = new PridatPojistence(adresy, document.querySelector('#ulozitPojistence'));
pridatPojistence.spustit();