'use strict';

const privatni = new WeakMap();
export class ObsluhaDetailStranky{
    constructor(id){
        privatni.set(this, {
            _id: id
        });
    }
}