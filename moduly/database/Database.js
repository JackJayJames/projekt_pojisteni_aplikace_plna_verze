'use strict';

const Schema = require('./Schema.js')
const mongoose = require('mongoose');


const privatni = new WeakMap();
module.exports = class Database{
    constructor(){
        privatni.set(this, {
            _adresa: "mongodb://127.0.0.1:27017/pojistdb",
            _ModelPojistenec: mongoose.model('Pojistenec', Schema.pojistenec),

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
            _smazatPojistence: async function(id){
                return await this._ModelPojistenec.findByIdAndDelete(id);
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
}