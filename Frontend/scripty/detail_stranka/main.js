'use strict';

import { ObsluhaDetailStranky } from "../moduly/ObsluhaDetailStranky.js";
import { Ajax } from "../moduly/Ajax.js";
import { Vlastnosti } from "../moduly/Vlastnosti.js";
import { FormInputOutput } from "../moduly/FormInputOutput.js";
import { VlastnostiPojisteni } from "../moduly/VlastnostiPojisteni.js";
import { Validace } from "../moduly/Validace.js";

const userData = {
    "pojistenec_id": localStorage.getItem('pojistenec_id'),
    "ticket_id": localStorage.getItem('ticket_id')
};

if(userData.pojistenec_id && userData.ticket_id){
    Ajax.get(`http://localhost:5500/api/pojistenec/${userData.pojistenec_id}/${userData.ticket_id}`)
        .then(res => {
            console.log(res);
            const vystupInfo = {
                jmeno: new Vlastnosti(res.jmeno, document.querySelector("#jmeno")),
                prijmeni: new Vlastnosti(res.prijmeni, document.querySelector("#prijmeni")),
                narozeni: new Vlastnosti(new Date(res.narozeni).toLocaleDateString(), document.querySelector("#narozeni")),
                mail: new Vlastnosti(res.mail, document.querySelector("#mail")),
                telefon: new Vlastnosti(res.telefon, document.querySelector("#telefon")),
                ulice: new Vlastnosti(res.ulice, document.querySelector("#ulice")),
                mesto: new Vlastnosti(res.mesto, document.querySelector("#mesto")),
                psc: new Vlastnosti(res.psc, document.querySelector("#psc")),
                pojisteni: new VlastnostiPojisteni(res.pojisteni, "")
            };
            const formPojisteni = {
                nazev: new FormInputOutput(document.querySelector("#nazev"), document.querySelector("#valNazev"), Validace.zvalidovatNazev),
                castka: new FormInputOutput(document.querySelector("#castka"), document.querySelector("#valCastka"), Validace.zvalidovatCastku),
                predmet: new FormInputOutput(document.querySelector("#predmet"), document.querySelector("#valPredmet"), Validace.zvalidovatPredmet),
                platnost: new FormInputOutput(document.querySelector("#platnost"), document.querySelector("#valPlatnost"), Validace.zvalidovatPlatnost)
            }
            const detail = new ObsluhaDetailStranky(userData, vystupInfo, formPojisteni, document.querySelector("#addPoj"));
            detail.spustit();
        })
        .catch(err => {
            console.log(err);
            console.log(userData);
            if(err.status === 401) ObsluhaDetailStranky.prepnoutNaLogin();
        });
    
}
else{
    ObsluhaDetailStranky.prepnoutNaLogin();
}



