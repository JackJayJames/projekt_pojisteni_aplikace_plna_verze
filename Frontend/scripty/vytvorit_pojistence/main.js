'use strict';

import { PridatPojistence } from "../moduly/PridatPojistence.js";
import { FormInputOutput } from "../moduly/FormInputOutput.js";
import { Validace } from "../moduly/Validace.js";

const adresy = {
    username: new FormInputOutput(document.querySelector('#poj_username'), document.querySelector('#er-Username'), Validace.zvalidovatUsername),
    password_I: new FormInputOutput(document.querySelector('#poj_password'), document.querySelector('#er-Password'), Validace.zvalidovatPassword),
    password_II: new FormInputOutput(document.querySelector('#poj_passwordII'), document.querySelector('#er-PasswordII'), Validace.zvalidovatPassword),
    jmeno: new FormInputOutput(document.querySelector('#poj_jmeno'), document.querySelector('#er-Jmeno'), Validace.zvalidovatJmeno),
    prijmeni: new FormInputOutput(document.querySelector('#poj_prijmeni'), document.querySelector('#er-Prijmeni'), Validace.zvalidovatJmeno),
    email: new FormInputOutput(document.querySelector('#poj_email'), document.querySelector('#er-Email'), Validace.zvalidovatEmail),
    telefon: new FormInputOutput(document.querySelector('#poj_telefon'), document.querySelector('#er-Telefon'), Validace.zvalidovatTelefon),
    ulice: new FormInputOutput(document.querySelector('#poj_ulice'), document.querySelector('#er-Ulice'), Validace.zvalidovatAdresu),
    mesto: new FormInputOutput(document.querySelector('#poj_mesto'), document.querySelector('#er-Mesto'), Validace.zvalidovatAdresu),
    narozeni: new FormInputOutput(document.querySelector('#poj_narozeni'), document.querySelector('#er-Narozeni'), Validace.zvalidovatNarozeni),
    psc: new FormInputOutput(document.querySelector('#poj_psc'), document.querySelector('#er-Psc'), Validace.zvalidovatPsc)
};

const pridatPojistence = new PridatPojistence(adresy, document.querySelector('#ulozitPojistence'));
pridatPojistence.spustit();