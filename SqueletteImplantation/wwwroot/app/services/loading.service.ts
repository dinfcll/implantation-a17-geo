import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class LoadingService extends BaseService {
    loadingGlobalActive: boolean = false;
    loadingLocalActive: boolean = false;

    startLoadGlobal() {
        this.loadingGlobalActive = true;
    }

    stopLoadGlobal() {
        this.loadingGlobalActive = false;
    }

    startLoadLocal() {
        this.loadingLocalActive = true;
    }

    stopLoadLocal() {
        this.loadingLocalActive = false;
    }

    delayTest(ms: number) {
        let dateCourrante: number;
        let dateObjectif: number;
        dateCourrante = Date.now();
        dateObjectif = dateCourrante + ms;
        while (dateCourrante !== dateObjectif) {
            dateCourrante = Date.now();
        }
    }
}