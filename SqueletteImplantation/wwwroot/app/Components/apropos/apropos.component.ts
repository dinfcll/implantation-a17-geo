import { Component, OnInit } from '@angular/core';




@Component({
    selector: 'aPropos',
    templateUrl: './apropos.component.html',
    styleUrls: ['./apropos.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class aProposComponent implements OnInit {
    constructor() { };

    ngOnInit() : void{
        setTimeout(() => {
            document.getElementById('testanimannie').style.height = '100%';
        }, 5000);

        setTimeout(() => {
            document.getElementById('testanimantoine').style.height = '100%';
        }, 7500);

        setTimeout(() => {
            document.getElementById('testanimpascal').style.height = '100%';
        }, 10000);

        setTimeout(() => {
            document.getElementById('testanimjerome').style.height = '100%';
        }, 12500);
        
    }

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