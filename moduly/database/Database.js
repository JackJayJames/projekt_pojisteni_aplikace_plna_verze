'use strict';

const Schema = require('./Schema.js')
const mongoose = require('mongoose');
const { pojisteni } = require('../Validace.js');


const privatni = new WeakMap();
module.exports = class Database{
    constructor(){
        privatni.set(this, {
            _adresa: "mongodb://127.0.0.1:27017/pojistdb",
            _ModelPojistenec: mongoose.model('Pojistenec', Schema.pojistenec),
            _ModelPojisteni: mongoose.model('Pojisteni', Schema.pojisteni),

            _vytvoritModelPojistenec: function(pojistenec){
                return this._ulozitModel(new this._ModelPojistenec(pojistenec));
            },
            _ulozitModel: async function(model){
                return await model.save();
            },
            _ziskatPojistence: async function(){
                return await this._ModelPojistenec.find()
            },
            _ziskatPojistenceDleID: async function(id){
                return await this._ModelPojistenec.findById(id);
            },
            _ziskatPojisteni: async function(id){
                return await this._ModelPojisteni.findById(id);
            },
            _smazatPojistence: async function(id){
                return await this._ModelPojistenec.findByIdAndDelete(id);
            },
            _ulozitPojisteni: async function(pojistenec_ID, pojisteni){
                const result = await this._ModelPojisteni(pojisteni).save();
                const pojistenec = await this._ModelPojistenec.findById(pojistenec_ID);
                pojistenec.pojisteni.push(result.id);
                await this._ModelPojistenec.findByIdAndUpdate(pojistenec, { pojisteni: pojistenec.pojisteni });
                await this._ModelPojisteni.findByIdAndUpdate(result, { pojistenec_ID: pojistenec.id });
                return result;
            }
        });
    }
    spustit(){
        mongoose.connect(privatni.get(this)._adresa, { useNewUrlParser: true })
            .then(() => console.log(`Connected to MongoDB at ${privatni.get(this)._adresa}`))
            .catch(error => console.error('Could not connect to MongoDB...', error));
    }
    ulozitPojistence(pojistenec){
        return privatni.get(this)._vytvoritModelPojistenec(pojistenec);
    }
    ziskatPojistence(id){
        if(!id)
            return privatni.get(this)._ziskatPojistence();
        else
            return privatni.get(this)._ziskatPojistenceDleID(id);
    }
    smazatPojistence(id){
        return privatni.get(this)._smazatPojistence(id);
    }
    ulozitPojisteni(pojistenec, pojisteni){
        return privatni.get(this)._ulozitPojisteni(pojistenec, pojisteni);
    }
    ziskatPojisteni(id){
        return privatni.get(this)._ziskatPojisteni(id);
    }
}