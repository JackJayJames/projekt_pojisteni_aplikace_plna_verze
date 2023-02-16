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
            if(requestData)
                url = (url.indexOf("?") == -1) ? `${url}?${requestData}` : `${url}&${requestData}`;
        }
        else
            fetchOptions.body = Ajax._serialize(data);
        
        let response = await fetch(url, fetchOptions);

        if(originalResponse)
            return response;
        if(!response.ok)
            throw new Error(`${response.status} - ${response.statusText}`);
        
        let contentType = response.headers.get('content-type');
        if(contentType){
            if(contentType.includes('application/json'))
                return response.json();
            if(contentType.includes('text/') || contentType.includes('text/html') || contentType.includes('text/css'
                || contentType.includes('text/javascript') || contentType.includes('text/markdown')))
                return response.text();
            if(contentType.includes('multipart/form-data'))
                return response.formData();
            if(contentType.includes('application/octet-stream'))
                return response.arrayBuffer();
        }

        throw new TypeError('Content type not found. Cannot autoparse the response')
    }
    static _serialize(obj, prefix = ''){
        let str = [];
        for(let p in obj){
            if(obj.hasOwnProperty(p)){
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    Ajax._serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }
}