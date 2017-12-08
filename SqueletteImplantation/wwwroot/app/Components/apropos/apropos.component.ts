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
    histoirePersonnage:string[];
    imagePersonnage:string[];
    presentationCourante:number;
    constructor() {
        this.presentationCourante = 0;
        this.histoirePersonnage = ["oulala elle aime les chats ",
        "Une belle soupe ",
        "Wizard horse (Pascal) fut un ancien mage de l'électronique. Il ne put pas percer dans ce domaine à cause de sa fixation pour la magie réparatrice et de l'arrivée de nouvelles magies extravagantes. Les gens délaissèrent la magie de réparation au profit de la nouveauté. Après un long écart dans le domaine de la transformation d'animaux en charcuteries, il se recycla en mage informatique. Une force renaquit en lui, retrouvant un nouveau dessein à sa vie. Il appliqua des anciens concepts de la magie électronique pour mieux saisir la nouvelle. ",
        "Une belle pelle "];
        this.imagePersonnage = [
            "../../../images/annie.gif",
            "../../../images/antoine.gif",
            "../../../images/pascal.gif",
            "../../../images/jerome.gif"
        ]
     };

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
                document.getElementById('imgRamble').style.visibility = "visible";
            },1100);
        },37250);
    }

    public showDesc(indice:number){
        document.getElementById('descriptionPerso').style.width = "100%";
        let image = document.createElement("img");
        image.src = this.imagePersonnage[indice];
        image.style.maxHeight = "100%";
        image.id = 'ImageSelf';
        let textPrez = document.createElement("p");
        textPrez.style.color = "white";
        textPrez.id = "descriptionPrez";
        textPrez.innerText = this.histoirePersonnage[indice];
        document.getElementById('PresentationImage').appendChild(image);
        document.getElementById('PresentationContenu').appendChild(textPrez);
    }

    public fermeDesc(){
        document.getElementById('descriptionPerso').style.width = "0%";
        document.getElementById('ImageSelf').remove();
        document.getElementById('descriptionPrez').remove();
    }
    
    public nextDesc(){
        this.presentationCourante++;
        if(this.presentationCourante > 3)
        {
            this.presentationCourante = 0;
        }
        document.getElementById('ImageSelf').setAttribute('src',
            this.imagePersonnage[this.presentationCourante]);
        document.getElementById('descriptionPrez').innerText = this.histoirePersonnage[this.presentationCourante];
    }

    public lastDesc(){
        this.presentationCourante--;
        if(this.presentationCourante < 0)
        {
            this.presentationCourante = 3;
        }
        document.getElementById('ImageSelf').setAttribute('src',
            this.imagePersonnage[this.presentationCourante]);
        document.getElementById('descriptionPrez').innerText = this.histoirePersonnage[this.presentationCourante];
    }
    
}