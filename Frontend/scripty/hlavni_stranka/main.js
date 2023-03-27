'use strict';

import { FormInputOutput } from "../moduly/FormInputOutput.js";
import { ObsluhaHlStranky } from "../moduly/ObsluhaHlStranky.js";
import { Validace } from "../moduly/Validace.js";

const loginInput = {
    username: new FormInputOutput(document.querySelector('[name="Username"]'), document.querySelector('.err-username'), Validace.zvalidovatUsername),
    password: new FormInputOutput(document.querySelector('[name="Password"]'), document.querySelector('.err-password'), Validace.zvalidovatPassword)
};

const obsluha = new ObsluhaHlStranky(loginInput, document.querySelector(".prihlasit"));
obsluha.spustit();