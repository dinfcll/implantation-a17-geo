import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;


@Component({
    selector: 'aPropos',
    templateUrl: './apropos.component.html',
    styleUrls: ['./apropos.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class aProposComponent implements OnInit {
    
    constructor() { };

    ngOnInit() : void{
        let audio = new Audio();
        audio.src ='../../../asset/Percussion.mp3';
        audio.load();
        audio.play();
        setTimeout(() => {
            $('#testanimannie').collapse();
        }, 5000);

        setTimeout(() => {
            $('#testanimantoine').collapse();
        }, 7500);

        setTimeout(() => {
            $('#testanimpascal').collapse();
        }, 10000);

        setTimeout(() => {
            $('#testanimjerome').collapse();
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