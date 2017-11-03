import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    _apiURI: string;

    constructor() {
<<<<<<< HEAD
        this._apiURI = '//localhost:56306/api'; //linux
        //this._apiURI = '//localhost:5000/api'; //local
        //this._apiURI = '/api'; //instance
=======
        //this._apiURI = '//localhost:56306/api'; //linux
        this._apiURI = '//localhost:5000/api'; //local
        //this._apiURI = '//api'; //instance
>>>>>>> f65b43820ba36f410003eb352049a4ac46408daa
    }

    getApiURI() {
        return this._apiURI;
    }
}