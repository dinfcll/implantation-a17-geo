import { Component } from '@angular/core';




@Component({
    selector: 'aPropos',
    templateUrl: './apropos.component.html',
    styleUrls: ['./apropos.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class aProposComponent {
    constructor() { };

    showDesc(){
        document.getElementById('descriptionPerso').style.width = "100%";
        let image = document.createElement("img");
        image.src = "../../../images/annifire.gif";
        image.style.maxHeight = "100%";
        image.id = 'ImageSelf';
        document.getElementById('PresentationImage').appendChild(image);
    }

    fermeDesc(){
        document.getElementById('descriptionPerso').style.width = "0%";
        document.getElementById('ImageSelf').remove();
    }
    
}