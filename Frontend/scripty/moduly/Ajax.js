'use strict';

export class Ajax{
    static async #_request(url, type, data, originalResponse){
        
        let fetchOptions = {
            method: type,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                //'Content-Type': { 'application/x-www-form-urlencoded'},
                'Content-Type': 'application/json'
            },
        };
        if("POST" === type)
            fetchOptions['body'] = JSON.stringify(data);
        
        let response = await fetch(url, fetchOptions);
        console.log(response);

        if(originalResponse)
            return response;
        if(!response.ok){
            return Promise.reject(`${response.status} - ${response.statusText}`);
            //throw new Error(`${response.status} - ${response.statusText}`);
        }
        
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
    
    static async get(url, data = {}, originalResponse = false){
        return this.#_request(url, 'GET', data, originalResponse);
    }
    static async post(url, data = {}, originalResponse = false){
        return this.#_request(url, 'POST', data, originalResponse);
    }
    static async delete(url, data = {}, originalResponse = false){
        return this.#_request(url, 'DELETE', data, originalResponse);
    }
}