'use strict';

import { ObsluhaDetailStranky } from "../moduly/ObsluhaDetailStranky.js";
import { Ajax } from "../moduly/Ajax.js";

const userData = {
    "pojistenec_id": localStorage.getItem('pojistenec_id'),
    "ticket_id": localStorage.getItem('ticket_id')
};
console.log(userData);

if(userData.pojistenec_id && userData.ticket_id){
    Ajax.get(`http://localhost:5500/api/pojistenec/${userData.pojistenec_id}/${userData.ticket_id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    const detail = new ObsluhaDetailStranky(sessionStorage.getItem("pojistenec"));
    detail.spustit();
}
else{
    ObsluhaDetailStranky.prepnoutNaLogin();
}



