'use strict';

export class Ajax{
    static async _request(url, type, data, originalResponse){
        let types = ['GET', 'POST', 'DELETE'];
        type = type.toUpperCase();
        if(types.indexOf(type) === -1)
            throw new Error('Invalid request type');
        
        let fetchOptions = {
            methon: type,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        if(type === 'GET'){
            let requestData = Ajax._serialize(data);
        }
    }
}