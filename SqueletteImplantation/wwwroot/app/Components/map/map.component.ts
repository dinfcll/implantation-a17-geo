import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Marqueur } from '../../class/marqueur.class';

import { LoadingService } from '../../services/loading.service';
import { UtilisateurService } from './../../services/utilisateur.service';

declare var google: any;
declare var jBox: any;

@Component ({
    selector: 'map',
    templateUrl:'./map.html',
    styleUrls: [
        './map.component.css',
        './../../../lib/bootstrap/dist/css/bootstrap.css',
        './meteo.css'
    ]
})

export class MapComponent implements OnInit {
     name ='Map';
     currentmarqueur:Marqueur;
     map:any;
     AcceptMarker:boolean;
     DetailsView:boolean;
     modmarq:boolean;
     baseUrl: string = '';
     banqueimageicone: Array<string>;
     marqtemp: any;
     googlemarq: any[];
     tabmarqtemp: any[];
     curidmarq:number;
     stadetrace: number; //0-bouton non click 1-peux tracé 2-peux enregistrer(mins 1 point)
     tracetrajet: any;
     image:string;
     imagebuffer:any[];
     ProfilCourrant:number;
     couleurMarqueurCourant:string;
     tPathServicesImages: string[];
     tServicesRando: string[];
     tTitreServices: string[];
     imageActuelGallery:number;
     imgDefaultRando: string;

    constructor(private http: Http, private ref: ChangeDetectorRef, private utilisateurService: UtilisateurService,
                private loadingService: LoadingService, private router: Router) {
        this.AcceptMarker = false;
        this.banqueimageicone = ['../../../images/officiel_icone.svg',
                            '../../../images/user_icone.svg'];
        this.remiseZeroMarqueurCurrentMarqueur();
        this.marqtemp = new google.maps.Marker ({
            icon: this.banqueimageicone[1],
            draggable: true,
        });
        this.stadetrace = 0;
        this.googlemarq = new Array();
        this.tabmarqtemp = new Array();
        this.imagebuffer = new Array();
        this.tracetrajet = new google.maps.Polyline({
            strokeColor: '#84ffb8',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });

        if(localStorage.getItem('profilId') === "") {
            this.ProfilCourrant = -1;
        } else {
            this.ProfilCourrant = Number(localStorage.getItem('profilId'));
        }        
        this.couleurMarqueurCourant = '../../../images/current_icone.svg';
        this.imageActuelGallery = -1;
        this.tPathServicesImages = ['../../../images/servicesimages/toilettes.PNG',
                                    '../../../images/servicesimages/eaupotable.PNG',
                                    '../../../images/servicesimages/acceshandicape.PNG',
                                    '../../../images/servicesimages/stationnement.PNG',
                                    '../../../images/servicesimages/balise.PNG'];
        this.tTitreServices = ["Toilettes", "Eau Potable", "Accès Handicapé", "Stationnement","Chemin Balisé"];
        this.tServicesRando = new Array();
        this.imgDefaultRando = '../../../images/sapin.jpeg'
    }

    showGallery(index:number): void {
        this.imageActuelGallery = index;
        document.getElementById('GalleryImage').style.width = "100%";
        let image = document.createElement("img");
        image.src = this.googlemarq[this.curidmarq].tabImageMarqueur[index];
        image.style.maxHeight = "100%";
        image.id = 'ImageDansGallery';
        document.getElementById('PresentationImage').appendChild(image);
    }

    fermeGallery(): void {
        document.getElementById('GalleryImage').style.width = "0%";
        document.getElementById('ImageDansGallery').remove();
        this.imageActuelGallery = -1;
    }

    prochaineImageGallery(): void {
        this.imageActuelGallery++;
        if(this.imageActuelGallery >= this.googlemarq[this.curidmarq].tabImageMarqueur.length) {
            this.imageActuelGallery = 0;
        }
        document.getElementById('ImageDansGallery').setAttribute('src',
            this.googlemarq[this.curidmarq].tabImageMarqueur[this.imageActuelGallery]);
    }

    imagePrecedentGallery(): void {
        this.imageActuelGallery--;
        if(this.imageActuelGallery < 0) {
            this.imageActuelGallery = this.googlemarq[this.curidmarq].tabImageMarqueur.length - 1;
        }
        this.couleurMarqueurCourant = '../../../images/current_icone.svg'
        document.getElementById('ImageDansGallery').setAttribute('src',
            this.googlemarq[this.curidmarq].tabImageMarqueur[this.imageActuelGallery]);
    }

    remiseZeroMarqueurCurrentMarqueur(): void {
        let typeUtilisateuricone = 1;
        if(this.utilisateurService.estAdmin() == '1') {
            typeUtilisateuricone = 0;
        }
        this.currentmarqueur = new Marqueur(0, "", 0, 0, "", typeUtilisateuricone, "", "", Number(localStorage.getItem('profilId')), "", "", 0, "","");
    }    

    updateDifficulte(selectedDiff:number):void{
        this.currentmarqueur.difficulte=selectedDiff;
        this.ref.detectChanges();
    }

    PreUploadImage(event: any): void {
        let files: FileList;
        files = event.target.files;
        if(files && files[0]) {
            if(files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
                let fr = new FileReader();
                fr.onload = (e:any) => {
                    if(this.AcceptMarker) {
                        this.image = e.target.result;
                    } else if (this.modmarq) {
                        this.currentmarqueur.imageMarqueur = e.target.result;
                    }
                    this.ref.detectChanges();
                };
                if(this.DetailsView) {
                    this.AjoutImagesBanqueMarqueur(files[0]);
                }
                else {
                    fr.readAsDataURL(files[0]);
                }              
            } 
            else {
                new jBox('Notice', {
                    content: 'Veuillez entrer une image',
                    color: 'red',
                    autoClose: 2000
                });
            }
        }
    }

    AjoutImagesBanqueMarqueur(fichierImage:File): void {
        const formData = new FormData();
        formData.append("fichier", fichierImage);
        formData.append("extFichier", fichierImage.name.split('.').pop());
        this.http.post("api/marqueurs/banqueimage/" + this.currentmarqueur.id, formData)
        .subscribe( res => {
            if(res) {
                let baseUrlLocalImage = "../../../images/banqueImageMarqueur/";
                this.googlemarq[this.curidmarq].tabImageMarqueur.unshift( baseUrlLocalImage + 
                    res.text());
                this.currentmarqueur.banqueImage = res.text() + "," + 
                    this.currentmarqueur.banqueImage;
                this.ref.detectChanges();
            }
            else {
                new jBox('Notice', {
                    content: 'Intégration non possible',
                    color: 'red',
                    autoClose: 2000
                });
            }
        });
    }

    messageErreurActionSurCarte(): void {
        new jBox('Notice', {
            content: 'Action en cours sur la carte',
            color: 'red',
            autoClose: 5000
        });
    }

    PermissionAjoutMarker():void {
        if (localStorage.getItem('profilId') === '') {
            let confirmation;
            confirmation = confirm('Un profil est nécessaire si vous voulez créer un marqueur.' +
                '\nVoulez-vous créer votre profil maintenant?');
            if (confirmation) {
                this.router.navigate(['/profil']);
            }
        } else {
            if(this.stadetrace === 0 && !this.DetailsView) {
                this.tServicesRando = [];
                this.AcceptMarker = !this.AcceptMarker;
                this.DetailsView = false;
                if(this.AcceptMarker) {
                    this.remiseZeroMarqueurCurrentMarqueur();
                    new jBox('Notice', {
                        content: 'Cliquer sur la carte pour positionner votre nouveau marqueur',
                        color: 'green',
                        autoClose: 5000
                    });
                } else {
                    this.marqtemp.setMap(null);
                    this.Annulation();
                }
                this.ref.detectChanges();
            } else {
                this.messageErreurActionSurCarte();
            }
        }
    }

    PermissionDetails(): void {
        if(this.stadetrace === 0 && !this.AcceptMarker && !this.modmarq) {
            if(this.currentmarqueur.nom) {
                this.DetailsView = !this.DetailsView;
                this.AcceptMarker=false;
                this.LoadDetails();  
            } else {
                new jBox('Notice', {
                    content: 'Cliquer sur un marqueur pour en voir les détails',
                    color: 'red',
                    autoClose: 2000
                });
            }
        } else {
            this.messageErreurActionSurCarte();
        }
    }

    supprimerMarqueur(): void {
        let informationSuppression= "";
        let couleurBox = "";
        this.http.delete("api/marqueurs/"+ this.currentmarqueur.id)
        .subscribe((res)=>{
            if(res.status === 200) {
                informationSuppression = "Le marqueur au nom de " + this.currentmarqueur.nom + " est bien supprimer";
                this.googlemarq[this.curidmarq].cheminTrajet.setMap(null);
                this.googlemarq[this.curidmarq].setMap(null);
                couleurBox = "green";
                this.DetailsView = false;
                this.remiseZeroMarqueurCurrentMarqueur();
                this.ref.detectChanges();
                this.Annulation();
            } else {
                informationSuppression = "Échec de la suppression du marqueur " + this.currentmarqueur.nom + " retenter ultérieurement";
                couleurBox = "red";
            }
            new jBox('Notice', {
                content: informationSuppression,
                color: couleurBox,
                autoClose: 5000
            });
        });

    }

    PermissionMod():void {
        if(this.modmarq) {
            this.currentmarqueur.nom = this.googlemarq[this.curidmarq].title;
            this.currentmarqueur.desc = this.googlemarq[this.curidmarq].desc;
            this.modmarq = !this.modmarq;
            this.PermissionDetails();
        } else {
            this.DetailsView = !this.DetailsView;
            this.modmarq = !this.modmarq;
            this.ref.detectChanges(); 
        }             
    }

    ChangeStade():void {
        if(!this.AcceptMarker && !this.DetailsView && !this.modmarq) {
            if(this.stadetrace < 1) {
                this.stadetrace = 1;
                this.googlemarq.forEach((mark) => {
                    if(mark.informationMarqueur.icone > 0){
                        mark.setAnimation(google.maps.Animation.BOUNCE);
                    }
                });
            } else if(this.stadetrace === 3) {
                let cheminlat:string = "";
                let cheminlng:string = "";
                this.tabmarqtemp.forEach((mark) =>{
                    cheminlat += mark.getPosition().lat()+',';
                    cheminlng += mark.getPosition().lng()+',';
                });

                cheminlat = cheminlat.slice(0, -1);
                cheminlng = cheminlng.slice(0, -1);

                this.currentmarqueur.trajetlat = cheminlat;
                this.currentmarqueur.trajetlng = cheminlng;

                this.loadingService.startLoadLocal();

                this.http.post("api/marqueurs/modification", this.currentmarqueur)
                    .subscribe((res) => {
                        if(res != null) {
                            this.retourModMarqueur(res)
                            this.Annulation();
                        } else {
                            new jBox('Notice', {
                                content: 'Erreur de connection au serveur',
                                color: 'red',
                                autoClose: 2000
                            });
                        }
                        this.loadingService.stopLoadLocal();
                    });
            }
        }
        else {
            this.messageErreurActionSurCarte();
        }
    }


    retourModMarqueur(retour: any): void {
        let mark = this.AjoutMarker(retour.json() as Marqueur);
        this.googlemarq[this.curidmarq].setMap(null);
        this.googlemarq[this.curidmarq].cheminTrajet.setMap(null);
        this.googlemarq.splice(this.curidmarq, 1, mark);
        this.googlemarq[this.curidmarq].marqid = this.curidmarq;
        if(this.modmarq){
            this.PermissionMod();
        }
    }

    Annulation(): void {
        this.stadetrace = 0;
        this.tabmarqtemp.forEach((element) => {
            element.setMap(null);
        });
        this.tabmarqtemp = new Array();
        this.tracetrajet.setMap(null);
        this.tracetrajet = new google.maps.Polyline({
            strokeColor: '#84ffb8',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });
        this.map.setZoom(10);
        this.remiseZeroMarqueurCurrentMarqueur();
        this.googlemarq.forEach((m) => {
            m.setAnimation(null);
        });
    }

    getMarqueurs(): void {
        this.loadingService.startLoadGlobal();
        this.http.get("api/marqueurs")
                .subscribe((resdata) => {
                    let marqueur:Marqueur[] = resdata.json() as Marqueur[];
                    marqueur.forEach((mark) => {
                       this.googlemarq.push(this.AjoutMarker(mark));
                    });
                    this.loadingService.stopLoadGlobal();
                });
    }

    getMarqueursSuivi(): void {
        this.loadingService.startLoadGlobal();
        this.http.get("api/marqueurs/suivi/"+ Number(localStorage.getItem('profilId')))
            .subscribe((resdata) => {
                let marqueursuivi:Marqueur[] = resdata.json() as Marqueur[];
                marqueursuivi.forEach((mark) => {
                    this.googlemarq.push(this.AjoutMarker(mark));
                });
                this.loadingService.stopLoadGlobal();
            });            
    }

    retraitCouleurCurrentMarqueur(): void {
        if(this.currentmarqueur.nom) {
            this.googlemarq[this.curidmarq]
            .setIcon(this.banqueimageicone[this.currentmarqueur.icone]);
        }
    }

    constructionArrayImageMarqueur(images:string):string[] {
        if(images) {
            let tabImage = images.split(',');
            tabImage.splice(tabImage.length-1, 1)
            for(let i = 0; i < tabImage.length; i++) {
                tabImage[i] = "../../../images/banqueImageMarqueur/" + tabImage[i];
            }
            return tabImage;
        } else {
            let tabVide = new Array();
            return tabVide;
        }
    }

    AjoutMarker (info: Marqueur): any {
        let markerid = this.googlemarq.length
        var color:string = '#f3123d';
        if(this.utilisateurService.estAdmin() == '0') {
            color = '#84ffb8';
        }
        var chemin = new google.maps.Polyline({
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });
        
        var marker = new google.maps.Marker ({
            position: { lat: info.latitude, lng: info.longitude },
            map: this.map,
            icon: this.banqueimageicone[info.icone],
            title: info.nom,
            desc: info.desc,
            click: false,
            cheminTrajet: chemin,
            informationMarqueur: info,
            marqid: markerid,
            tabImageMarqueur: this.constructionArrayImageMarqueur(info.banqueImage)
        });

        marker.addListener('click', () => {
            if(!marker.click) {
                this.map.setZoom(13);
                this.map.panTo(marker.position);
                this.curidmarq = marker.marqid;
                this.retraitCouleurCurrentMarqueur();
                marker.setIcon(this.couleurMarqueurCourant);
                if(!this.AcceptMarker && this.stadetrace===0){
                    this.currentmarqueur = info;
                    if (info.servicesRando) {
                        this.tServicesRando = info.servicesRando.split('&');
                    } else {
                        this.tServicesRando = [];
                    }                   
                    this.PermissionDetails();      
                    this.ref.detectChanges();          
                }
                
                if(info.trajetlat != "" && info.trajetlat != null && info.trajetlng != "" && info.trajetlng != null) {
                    let chlat = info.trajetlat.split(",");
                    let chlng = info.trajetlng.split(",");

                    let path = marker.cheminTrajet.getPath();
                    path.push(new google.maps.LatLng(info.latitude,info.longitude));
                    for(let i = 0; i < chlat.length; i++) {
                        path.push(new google.maps.LatLng(chlat[i], chlng[i]))
                    }
                } 
                marker.cheminTrajet.setMap(this.map);
                marker.click = true;
                if(this.stadetrace === 1) {
                    this.currentmarqueur = info;
                    this.stadetrace = 2;
                    marker.cheminTrajet.setMap(null);
                    let path = this.tracetrajet.getPath();
                    path.push(marker.position);
                    this.googlemarq.forEach((m) => {
                        m.setAnimation(null);
                    });
                }
            } else {
                this.map.setZoom(10);
                this.retraitCouleurCurrentMarqueur();
                this.PermissionDetails();
                marker.cheminTrajet.setMap(null);
                marker.click = false;
                marker.cheminTrajet = new google.maps.Polyline ({
                    strokeColor: color,
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                    path: []
                });
            }
        });
        return marker;
    }
    
    //voir a changer de nom car va avoir plusieur fonction
    CreationMaker(Gdonne:any) {

        if(this.AcceptMarker) {
            this.currentmarqueur.latitude = Gdonne.latLng.lat();
            this.currentmarqueur.longitude = Gdonne.latLng.lng();
            this.marqtemp.setPosition({lat: this.currentmarqueur.latitude, lng: this.currentmarqueur.longitude});
            this.marqtemp.setMap(null); 
            this.marqtemp.setMap(this.map);
        }
        
        if(this.stadetrace === 2 || this.stadetrace === 3) {
            this.stadetrace = 3;
            this.ref.detectChanges();

            this.tracetrajet.setMap(this.map);
            var path = this.tracetrajet.getPath();
            path.push(Gdonne.latLng);
            let marktampon =  new google.maps.Marker({
                position: Gdonne.latLng,
                title: 'point #' + path.getLength(),
                map: this.map,
                draggable: true,
                id: this.tabmarqtemp.length,
                pathid: path.getLength() - 1
            });

            marktampon.addListener('drag', (e:any) => {
                let path = this.tracetrajet.getPath();
                path.setAt(marktampon.pathid, this.tabmarqtemp[marktampon.id].getPosition());
            });

            this.tabmarqtemp.push(marktampon);   
        }
    }

    ConfirmationMarker() {
        if(this.currentmarqueur.id === 0) {
            if(this.currentmarqueur.latitude == 0) {
                new jBox('Notice', {
                    content: 'Veuillez cliquer sur la carte pour ajouter un marqueur',
                    color: 'red',
                    autoClose: 2000
                });
            } else {
                let marqposition = this.marqtemp.getPosition();
                this.currentmarqueur.latitude = marqposition.lat();
                this.currentmarqueur.longitude = marqposition.lng();
                this.currentmarqueur.profilId=Number(localStorage.getItem('profilId'));
                this.currentmarqueur.imageMarqueur = this.image;
                this.image = "";
                this.currentmarqueur.servicesRando = this.tServicesRando.join('&');
                this.loadingService.startLoadLocal();
                this.http.post("api/marqueurs", this.currentmarqueur)
                .subscribe( res => {
                    this.googlemarq.push(this.AjoutMarker(res.json() as Marqueur));
                    this.PermissionAjoutMarker();
                    this.marqtemp.setMap(null);
                    this.loadingService.stopLoadLocal();
                });
            }
        } else {
            this.currentmarqueur.servicesRando = this.tServicesRando.join('&');
            this.loadingService.startLoadLocal();
            this.http.post("api/marqueurs/modification",this.currentmarqueur)
            .subscribe( res => {
                if(res != null) {
                    this.retourModMarqueur(res);
                } else {
                    new jBox('Notice', {
                        content: 'Erreur de connection au serveur',
                        color: 'red',
                        autoClose: 2000
                    });
                }
                this.loadingService.stopLoadLocal();
            });
        }
    }

    LoadDetails() {
        this.loadingService.startLoadGlobal();
        this.utilisateurService.getProfilById(String(this.currentmarqueur.profilId))
        .subscribe(res => {
            this.googlemarq[this.curidmarq].creator=res.username;
            if(res.profilimage) {
                this.googlemarq[this.curidmarq].proimg=res.profilimage;
            } else {
                this.googlemarq[this.curidmarq].proimg="../../../images/hiker.jpg";
            }
            this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+this.currentmarqueur.latitude+'&lon='+this.currentmarqueur.longitude+'&APPID=43899e65e2972c9b020bf0aa269ab48a')
            .subscribe(res => {
                var temp =res.json();
                this.googlemarq[this.curidmarq].temp= Math.round(temp.main.temp-273.15);
                this.googlemarq[this.curidmarq].weather=temp.weather[0].main;
                this.loadingService.stopLoadGlobal();
                this.ref.detectChanges();
            });
        });        
    } 

    ngOnInit(): void {
        var myCenter = { lat: 46.752560, lng: -71.228740 }; 
        var mapOptions = {
            zoom: 10,
            center: myCenter,
            mapTypeId: 'hybrid'
        }
        
        this.map = new google.maps.Map( document.getElementById('map'),mapOptions );
        if(this.utilisateurService.estAdmin() == '1') {
            this.getMarqueurs();
        } else {
            this.getMarqueursSuivi();
        }
            
        //géolocation
        if( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition (( position ) => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude   
                };
                
                var marker = new google.maps.Marker ({
                    position: pos,
                    map: this.map,
                    icon: '../../../images/ici_icone.svg'
                });
                
                this.map.setCenter(pos);
            }, function() {
                    new jBox('Notice', {
                        content: 'Géolocalisation refusée, position par defaut : Lévis',
                        color: 'yellow',
                        autoClose: 4000
                    });
                });
        }

        this.map.addListener('click', (e:any):void => {
                this.CreationMaker(e);
        });

        this.tracetrajet.setMap(this.map);
    }

    modifServicesRandonne(s: string) {
        let index = this.tServicesRando.indexOf(s);
        if(index >= 0) {
            this.tServicesRando.splice(index, 1);
        } else {
            this.tServicesRando.push(s);
        }
        this.ref.detectChanges();
    }
}
