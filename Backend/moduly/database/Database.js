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

            _kontrolaUserName: async function(user, pojistenec, user_ip){
                const result = await this._ModelUser.find({ "username": user.username })
                if(result.length !== 0) return Promise.reject('Uživatelké jméno zabráno');

                return this._vytvoritModelPojistenecUser(user, pojistenec, user_ip);
            },

            _vytvoritModelPojistenecUser: async function(user, pojistenec, user_ip){
                const resUser = await this._ulozitModel(new this._ModelUser(user));
                const resPojistenec = await this._ulozitModel(new this._ModelPojistenec(pojistenec));
                await this._spojitUserPojistenec(resUser._id, resPojistenec._id);
                const resTicket = await this._vytvoritTicket(user_ip, resPojistenec._id);

                return { pojistenec: resPojistenec, ticket: resTicket._id };
            },
            _vytvoritTicket: async function(user_ip, pojistenecID){
                return await this._ulozitModel(new this._ModelTicket({ timeOut: this._vytvoritTimeOut(), ip: user_ip, pojistenec_ID: pojistenecID }));
            },
            _vytvoritTimeOut: function(){
                const date = new Date();
                date.setDate(date.getDate() + 3);
                return date;
            },
            _ulozitModel: async function(model){
                return await model.save();
            },
            _smazatModel: async function(model, id){
                return await model.findByIdAndDelete(id);
            }
            ,
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
                const result = await this._smazatModel(this._ModelPojistenec, id)
                const tickets = await this._ModelTicket.find({ pojistenec_ID: id });
                const user = await this._ModelUser.findOne({ pojistenec_ID: id });
                console.log(user._id.toHexString());
                await this._smazatModel(this._ModelUser, user._id);
                for(const ticket of tickets){
                    await this._smazatModel(this._ModelTicket, ticket._id);
                }
                for(const pojisteni of result.pojisteni){
                    await this._smazatModel(this._ModelPojisteni, pojisteni);
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
            },
            _najitTicket: async function(pojID, ticketID, reqIP){
                const result = await this._ModelTicket.find({ "_id": mongoose.Types.ObjectId(ticketID), "pojistenec_ID": pojID, "ip": reqIP });
                if(result.length === 0) return [];
                if(result[0].timeOut < Date.now()){
                    await this._smazatTicket(result[0]._id);
                    return -1;
                }
                return result;
            },
            _smazatTicket: async function(id){
                await this._smazatModel(this._ModelTicket, id);
            }
        });
    }
    spustit(){
        mongoose.connect(privatni.get(this)._adresa, { useNewUrlParser: true })
            .then(() => console.log(`Connected to MongoDB at ${privatni.get(this)._adresa}`))
            .catch(error => console.error('Could not connect to MongoDB...', error));
    }
    ulozitPojistence(user, pojistenec, user_ip){
        return privatni.get(this)._kontrolaUserName(user, pojistenec, user_ip);
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
    async kontrolaTicketu(pojID, ticketID, reqIP){
        const result = await privatni.get(this)._najitTicket(pojID, ticketID, reqIP);
        if( result === -1) return Promise.reject("Ticket vypršel");
        if(result.length === 0) return Promise.reject("Neplatný ticket");
        return;
    }
    kontrolaPrihlaseni(username, password){
        console.log("Username " + username);
        console.log("Password " + password);

        
    }
}