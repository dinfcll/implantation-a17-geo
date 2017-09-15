import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    _apiURI : string;

    constructor() {
        this._apiURI = 'http://localhost:5000/api'; //local
        //this._apiURI = '/api'; //instance
    }

    getApiURI() {
        return this._apiURI;
    }
}