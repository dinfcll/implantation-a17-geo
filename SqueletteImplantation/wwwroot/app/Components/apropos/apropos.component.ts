import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;


@Component({
    selector: 'aPropos',
    templateUrl: './apropos.component.html',
    styleUrls: ['./apropos.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class aProposComponent implements OnInit {
    audio:any;
    constructor() { };

    ngOnInit() : void{
        this.audio = new Audio();
        this.audio.src ='../../../asset/Percussion.mp3';
        this.audio.load();
        this.audio.play();
        document.getElementById('fullscreenprez').style.width = '100%';
        document.getElementById('fullscreenprez').webkitRequestFullScreen();
        setTimeout(() => {
            $('#testanimannie').collapse();
            document.webkitCancelFullScreen();
            document.getElementById('fullscreenprez').style.width = '0%';
        }, 15000);

        setTimeout(() => {
            $('#testanimantoine').collapse();
        }, 25000);

        setTimeout(() => {
            $('#testanimpascal').collapse();
        }, 35000);

        setTimeout(() => {
            $('#testanimjerome').collapse();
        }, 45000);
        
        setTimeout(()=>{
            this.audio.pause();
        },75000);
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