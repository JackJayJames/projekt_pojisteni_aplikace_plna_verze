'use strict';

const mongoose = require('mongoose');

module.exports = class Database{
    constructor(){
        this.database = "mongodb://localhost:27017/pojistdb";
    }
}