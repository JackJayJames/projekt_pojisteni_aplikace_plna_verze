'use strict';

import { ObsluhaDetailStranky } from "../moduly/ObsluhaDetailStranky.js";

const userData = {
    "pojistenec_id": localStorage.getItem('pojistenec_id'),
    "ticket_id": localStorage.getItem('ticket_id')
};
console.log(userData);

if(userData.pojistenec_id && userData.ticket_id){
    const detail = new ObsluhaDetailStranky(sessionStorage.getItem("pojistenec"));
    detail.spustit();
}
else{
    window.location.replace('./index.html');
}

