'use strict';

import { PridatPojistence } from "../moduly/PridatPojistence.js";
import { FormInputOutput } from "../moduly/FormInputOutput.js";

const username = new FormInputOutput(document.querySelector('#poj_username'), document.querySelector('#er-Username'));
console.log(username);

const pridatPojistence = new PridatPojistence();
pridatPojistence.spustit();