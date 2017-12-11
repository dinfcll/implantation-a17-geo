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
        this.histoirePersonnage = ["Annie, nienie ou bloody Annie est une petite souris qui mange des biscuits dans son lit. Annie, c'est la personne la moins gênée au monde et s’en est quasiment inspirant. Elle a su craquer la carapace des plus durs. Annie est une très bonne joueuse d’équipe, elle a à cœur la réussite du projet, mais elle accorde plus d’importance aux membres de l’équipe. C’est maman Annie. Aussi, elle n’a pas peur de dire ce qu’elle pense! Si tu la fais chier, tu vas le savoir assez vite et c’est parfait comme ça. C’est l’âme et le cœur de l’équipe.",
        "Antoine-Tony-BrownSugar-NgModel-Cameltail Edmond. On est juste vraiment chanceux d'avoir eu Antoine comme coéquipier et comme ami. C'est tellement difficile de ne pas l'aimer et de ne pas tripper avec lui à nos cotes. Il est une des raisons du 'pourquoi Ramble est ce qu'il est'. Il a beaucoup donné au projet malgré le fait qu'il soit super occupé avec ses pratiques de band, sa job, sa blonde, ses amis... Mais, sincèrement, on aimerait bien le garder pour nous! You rock Antoine!",
        "Wizard horse (Pascal) fût anciennement un mage de l'électronique passionné par la réparation et l'entretien des machines. Malheureusement, les gens délaissèrent peu à peu la magie réparatrice d'appareils électroniques au profit de la nouveauté et il ne pu pas percer dans le domaine dû à l'arrivée de nouvelles magies extravagantes... Néanmoins, après quelque temps, il se recycla en mage de l'informatique! Une force renaquit en lui, retrouvant un nouveau dessein à sa vie! Aujourd'hui, Wizard Horse est maitre dans l'art d'aider les autres. Il vit d'amour de ses pairs, de code et... de Pepsi! On ne peut pas se passer de lui!",
        "Jérôme, c'est le coéquipier motivé qui participe à tous les projets du début à la fin sans relâche et sans jamais se décourager. Si chaque projet qu'on a remis en équipe avec lui a été ce qu'il est, c'est parce qu'il était là. Jérôme, c'est quelqu'un qui sait travailler en équipe, quelqu'un d'honnête qui n'a pas peur de donner son opinion et quelqu'un qui sait ce qu'il veut dans la vie. Et Jérôme, c'est aussi quelqu'un de super compétitif super drôle a regarder jouer à un jeu (quand tu n'es pas dans l'équipe opposée)! «Pick your side well, newb!»"];
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