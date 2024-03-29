'use strict';

const Joi = require('joi');

module.exports = class Validace{
    static login(login_params){
        const schema = Joi.object({
            username: Joi.string().min(6).required(),
            password: Joi.string().min(6).required()
        });
        return schema.validate(login_params);
    }
    static pojistenec(pojistenec){
        const schema = Joi.object({
            username: Joi.string().min(6).required(),
            password: Joi.string().min(6).required(),
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
    static pojisteni(pojisteni){
        const schema = Joi.object({
            nazev: Joi.string().min(5).required(),
            castka: Joi.number().min(1).required(),
            predmet: Joi.string().min(2).required(),
            platnost_od: Joi.date().required(),
            platnost_do: Joi.date().required(),
            udalosti_ID: Joi.array().items(Joi.string())
        });
        return schema.validate(pojisteni);
    }
    static udalost(udalost){
        const schema = Joi.object({
            nazev: Joi.string().min(5).required(),
            datum: Joi.date().required(),
            poznamka: Joi.string().required(),
        });
        return schema.validate(udalost);
    }
}