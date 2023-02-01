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
                return new this._ModelPojistenec(pojistenec);
            }
        });
    }
    spustit(){
        mongoose.connect(privatni.get(this)._adresa, { useNewUrlParser: true })
            .then(() => console.log(`Connected to MongoDB at ${privatni.get(this)._adresa}`))
            .catch(error => console.error('Could not connect to MongoDB...', error));
    }
    ulozitPojistence(obj){
        const pojistenec = privatni.get(this)._vytvoritModelPojistenec(obj);
        console.log(pojistenec);
    }
}