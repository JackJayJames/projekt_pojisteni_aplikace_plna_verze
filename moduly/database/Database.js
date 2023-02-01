'use strict';

const schema = require('./Schema.js')
const mongoose = require('mongoose');

module.exports = class Database{
    constructor(){
        this.database = "mongodb://127.0.0.1:27017/pojistdb";
    }
    spustit(){
        mongoose.connect(this.database, { useNewUrlParser: true })
            .then(() => console.log(`Connected to MongoDB at ${this.database}`))
            .catch(error => console.error('Could not connect to MongoDB...', error));
    }
}