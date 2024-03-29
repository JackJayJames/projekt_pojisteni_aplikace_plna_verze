'use strict';

module.exports = class Schema{
    static ticket = {
        timeOut: Date,
        ip: String,
        pojistenec_ID: String
    }
    static user = {
        username: String,
        password: String,
        pojistenec_ID: String
    }
    static pojistenec = {
        jmeno: String,
        prijmeni: String,
        narozeni: Date,
        mail: String,
        telefon: Number,
        ulice: String,
        mesto: String,
        psc: Number,
        pojisteni: Array
    }
    static pojisteni = {
        pojistenec_ID: String,
        nazev: String,
        castka: Number,
        predmet: String,
        platnost_od: Date,
        platnost_do: Date,
        udalosti_ID: Array
    }
    static udalost = {
        nazev: String,
        datum: Date,
        poznamka: String,
        status: {
            type: String,
            default: "Ke zpracování"
        },
        pojisteni_ID: String,
        pojistenec_ID: String
    }
}