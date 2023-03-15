'use strict';

const Schema = require('./Schema.js')
const mongoose = require('mongoose');
const { pojisteni } = require('../Validace.js');


const privatni = new WeakMap();
module.exports = class Database{
    constructor(adresa){
        privatni.set(this, {
            _adresa: adresa,
            _ModelUser: mongoose.model('User', Schema.user),
            _ModelPojistenec: mongoose.model('Pojistenec', Schema.pojistenec),
            _ModelPojisteni: mongoose.model('Pojisteni', Schema.pojisteni),

            _kontrolaUserName: async function(user, pojistenec){
                const result = await this._ModelUser.find({ "username": user.username })
                console.log(result);
                if(result.length === 0) return Promise.reject("Username already in use");
                return this._vytvoritModelPojistenecUser(user, pojistenec);
            },

            _vytvoritModelPojistenecUser: function(user, pojistenec){
                this._ulozitModel(new this._ModelUser(user))
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
                const result = await this._ModelPojistenec.findByIdAndDelete(id);
                for(const pojisteni of result.pojisteni){
                    await this._ModelPojisteni.findByIdAndDelete(pojisteni);
                }
                return result;
            },
            _smazatPojisteni: async function(id){
                const pojistenec = await this._ModelPojistenec.findOne({ "pojisteni": id });
                pojistenec.pojisteni.splice(pojistenec.pojisteni.indexOf(id), 1);
                await this._ModelPojistenec.findByIdAndUpdate(pojistenec.id, { pojisteni: pojistenec.pojisteni })
                return await this._ModelPojisteni.findByIdAndDelete(id);
            },
            _ulozitPojisteni: async function(pojistenec_ID, pojisteni){
                pojisteni.pojistenec_ID = pojistenec_ID;
                const result = await this._ModelPojisteni(pojisteni).save();
                const pojistenec = await this._ModelPojistenec.findById(pojistenec_ID);
                pojistenec.pojisteni.push(result.id);
                await this._ModelPojistenec.findByIdAndUpdate(pojistenec, { pojisteni: pojistenec.pojisteni });
                return result;
            }
        });
    }
    spustit(){
        mongoose.connect(privatni.get(this)._adresa, { useNewUrlParser: true })
            .then(() => console.log(`Connected to MongoDB at ${privatni.get(this)._adresa}`))
            .catch(error => console.error('Could not connect to MongoDB...', error));
    }
    ulozitPojistence(user, pojistenec){
        //if(!privatni.get(this)._kontrolaUserName(user.username)) return Promise.reject(new Error("Username already in use"));
        return privatni.get(this)._kontrolaUserName(user, pojistenec);

        //return privatni.get(this)._vytvoritModelPojistenecUser(user, pojistenec);
        //return Promise.resolve({});
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
    smazatPojisteni(id){
        return privatni.get(this)._smazatPojisteni(id);
    }
}