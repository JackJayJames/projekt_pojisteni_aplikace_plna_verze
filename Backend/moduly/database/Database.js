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
            _ModelTicket: mongoose.model('Ticket', Schema.ticket),
            _ModelPojistenec: mongoose.model('Pojistenec', Schema.pojistenec),
            _ModelPojisteni: mongoose.model('Pojisteni', Schema.pojisteni),

            _kontrolaUserName: async function(user, pojistenec){
                const result = await this._ModelUser.find({ "username": user.username })

                return this._vytvoritModelPojistenecUser(user, pojistenec);
            },

            _vytvoritModelPojistenecUser: async function(user, pojistenec){
                const resUser = await this._ulozitModel(new this._ModelUser(user));
                const resPojistenec = await this._ulozitModel(new this._ModelPojistenec(pojistenec));
                await this._spojitUserPojistenec(resUser._id, resPojistenec._id);
                const resTicket = await this._ulozitModel(new this._ModelTicket({ timeOut: this._vytvoritTimeOut() }));
                console.log(resTicket);
                return { pojistenec: resPojistenec, ticket: resUser._id };
            },
            _vytvoritTimeOut: function(){
                const date = new Date();
                date.setDate(date.getDate() + 3);
                return date;
            },
            _ulozitModel: async function(model){
                return await model.save();
            },
            _spojitUserPojistenec: async function(userID, pojistenecID){
                return await this._ModelUser.findByIdAndUpdate(userID, { pojistenec_ID: pojistenecID });
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
        return privatni.get(this)._kontrolaUserName(user, pojistenec);
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