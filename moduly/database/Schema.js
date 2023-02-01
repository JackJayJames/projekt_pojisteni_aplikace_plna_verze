'use strict';

module.exports = class Schema{
    static pojistenec = {
        jmeno: String,
        prijmeni: String,
        narozeni: Date,
        mail: String,
        telefon: Number,
        ulice: String,
        mesto: String,
        psc: Number,
        pojisteni: [ String ]
    }
}