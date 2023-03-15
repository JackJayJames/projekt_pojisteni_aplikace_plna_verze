'use strict';

module.exports = class User{
    constructor(username, password, id = "-1"){
        this.username = username;
        this.password = password;
        this.pojistenec_ID = id;
    }
}