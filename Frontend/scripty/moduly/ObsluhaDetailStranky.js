'use strict';

import { Ajax } from "./Ajax.js";
import { PopUp } from "./PopUp.js";

export class ObsluhaDetailStranky{
    
    spustit(){
        console.log("detail");
    }

    static prepnoutNaLogin(){
        window.location.replace('./index.html');
    }
}