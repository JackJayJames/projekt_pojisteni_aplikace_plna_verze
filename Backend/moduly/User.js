'use strict';

export class User{
    constructor(username, password, id = "-1"){
        this.username = username;
        this.password = password;
        this.id = id;
    }
}