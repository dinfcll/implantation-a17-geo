import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class LoadingService extends BaseService {
    loadingActive: boolean = false;
    
    startLoad() {
        this.loadingActive = true;
    }

    stopLoad() {
        this.loadingActive = false;
    }

    delayTest(ms: number) {
        let dateCourrante: number;
        let dateObjectif:number;
        dateCourrante = Date.now();
        dateObjectif = dateCourrante + ms;
        while(dateCourrante != dateObjectif) {
            dateCourrante = Date.now();
        }
    }
}