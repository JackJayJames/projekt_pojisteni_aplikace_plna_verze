'use strict';

const Joi = require('joi');

module.exports = class Validace{
    static pojistenec(pojistenec){
        const schema = Joi.object({
            jmeno: Joi.string().min(2).required(),
            prijmeni: Joi.string().min(2).required(),
            mail: Joi.string().min(6).required(),
            telefon: Joi.number().integer().min(100000000).max(999999999).required(),
            ulice: Joi.string().min(3).required(),
            mesto: Joi.string().min(3).required(),
            psc: Joi.number().min(10000).max(99999).required(),
            narozeni: Joi.date().required(),
            pojisteni: Joi.array().items(Joi.string())
        });
        return schema.validate(pojistenec);
    }
}