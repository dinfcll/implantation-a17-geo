import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;


@Component({
    selector: 'aPropos',
    templateUrl: './apropos.component.html',
    styleUrls: ['./apropos.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class aProposComponent implements OnInit {
    drum:any;
    fusrudah:any;
    constructor() { };

    ngOnInit() : void{
        let musiquePrete;
        this.drum = new Audio();
        this.fusrudah = new Audio();
        this.drum.src ='../../../asset/Percussion.mp3';
        this.drum.load();
        this.drum.play();
        this.fusrudah.src = '../../../asset/FusRoDahCut.mp3';
        this.fusrudah.load();
        document.getElementById('fullscreenprez').style.width = '100%';
        document.getElementById('fullscreenprez').webkitRequestFullScreen();
        setTimeout(() => {
            $('#testanimannie').collapse();
            document.webkitCancelFullScreen();
            document.getElementById('fullscreenprez').style.width = '0%';
        }, 15000);

        setTimeout(() => {
            $('#testanimantoine').collapse();
        }, 17500);

        setTimeout(() => {
            $('#testanimpascal').collapse();
        }, 20000);

        setTimeout(() => {
            $('#testanimjerome').collapse();
        }, 22500);
        
        setTimeout(()=>{
            this.drum.pause();
            this.fusrudah.play();

            setTimeout(()=>{ 
                document.getElementById('feuAnnie').remove();
            },800);
            setTimeout(()=>{ 
                document.getElementById('feuAntoine').remove();
            },900);
            setTimeout(()=>{ 
                document.getElementById('feuPascal').remove();
            },1000);
            setTimeout(()=>{ 
                document.getElementById('feuJerome').remove();
            },1100);
        },37250);
    }

    showDesc(){
        document.getElementById('descriptionPerso').style.width = "100%";
        let image = document.createElement("img");
        image.src = "../../../images/annie.gif";
        image.style.maxHeight = "100%";
        image.id = 'ImageSelf';
        document.getElementById('PresentationImage').appendChild(image);
    }

    fermeDesc(){
        document.getElementById('descriptionPerso').style.width = "0%";
        document.getElementById('ImageSelf').remove();
    }
    
}