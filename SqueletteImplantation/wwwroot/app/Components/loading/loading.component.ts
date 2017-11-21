import { Component } from '@angular/core';

import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css', './../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class LoadingComponent {
    constructor(private loadingservice: LoadingService) {

    }
}