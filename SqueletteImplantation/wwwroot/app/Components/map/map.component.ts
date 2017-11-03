import { Component, Input ,OnInit,ChangeDetectorRef, } from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from "../../services/config.service";
import { Marqueur } from "../../class/marqueur.class";

import { UtilisateurService } from './../../services/utilisateur.service';

declare var google: any;
declare var jBox:any;

@Component ({
    moduleId: module.id,
    selector: 'map',
    templateUrl:'./map.html',
    styleUrls:['./map.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css','./meteo.css']
})

export class MapComponent implements OnInit {
     name ='Map';
     public currentmarqueur:Marqueur;
     public map:any;
     public AcceptMarker:boolean;
     public DetailsView:boolean;
     public modmarq:boolean;
     public baseUrl: string = '';
     public banqueimageicone: Array<string>;
     public marqtemp: any;
     public googlemarq: any[];
     public tabmarqtemp: any[];
     public curidmarq:number;
     public stadetrace: number;//0-bouton non click 1-peux tracé 2-peux enregistrer(mins 1 point)
     public tracetrajet: any;
     public image:string;
     public imagebuffer:any[];
     public ProfilCourrant:number;

    constructor(private http: Http, private ref: ChangeDetectorRef,private utilisateurService: UtilisateurService) {
        this.AcceptMarker = false;
        this.banqueimageicone = ['../../../images/officiel_icone.svg',
                            '../../../images/user_icone.svg'];
        this.currentmarqueur = new Marqueur(0,"",0,0,"",1,"","",Number(localStorage.getItem('profilId')), "");
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
        this.ProfilCourrant = Number(localStorage.getItem('profilId'));
    }
    

    PreUploadImage(event:any):void
    {
        let files: FileList;
        files = event.target.files;
        if(files && files[0]){
            if(files[0].name.match(/.(jpg|jpeg|png|gif)$/i))
            {
                let fr = new FileReader();
                fr.onload = (e:any) => {
                    if(this.AcceptMarker){
                        this.image = e.target.result;
                    } else if (this.modmarq){
                        this.currentmarqueur.imageMarqueur = e.target.result;
                    }
                    this.ref.detectChanges();
                };
                fr.readAsDataURL(files[0]);

                
            } 
            else
            {
                new jBox('Notice', {
                    content: 'veuillez entrer une image',
                    color: 'red',
                    autoClose: 2000
                });
            }

        }
    }


    PermissionAjoutMarker():void {
        this.AcceptMarker = !this.AcceptMarker;
        this.DetailsView=false;
        if(this.AcceptMarker){
            this.currentmarqueur = new Marqueur(0,"",0,0,"",1,"","",Number(localStorage.getItem('profilId')),"");
            new jBox('Notice', {
                content: 'Clicker sur la carte pour positionner votre nouveau marqueur',
                color: 'green',
                autoClose: 5000
            });
        } else {
            this.marqtemp.setMap(null);
        }     
    }

    PermissionDetails():void {
        if(this.currentmarqueur.nom){
            this.DetailsView = !this.DetailsView;
            this.AcceptMarker=false;
            this.LoadDetails();  
        }
        else
        {
            new jBox('Notice', {
                content: 'Clicker sur un marqueur pour en voir les détails',
                color: 'red',
                autoClose: 2000
            });
        }

    }

    PermissionMod():void {
        if(this.modmarq)
        {
            this.currentmarqueur.nom = this.googlemarq[this.curidmarq].informationMarqueur.nom;
            this.currentmarqueur.desc = this.googlemarq[this.curidmarq].informationMarqueur.desc;
        }
        this.modmarq = !this.modmarq;
        this.PermissionDetails();
    }

    ChangeStade():void {
        if(this.stadetrace < 1){
            this.stadetrace = 1;
            this.googlemarq.forEach((mark) => {
                if(mark.informationMarqueur.icone > 0){
                    mark.setAnimation(google.maps.Animation.BOUNCE);
                }
            });
        } else if(this.stadetrace === 3){
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

            this.http.post("api/marqueurs/modification", this.currentmarqueur)
                .subscribe((res) => {
                    if(res != null){
                        this.retourModMarqueur(res)
                        this.Annulation();
                    } else {
                        new jBox('Notice', {
                            content: 'Erreur de connection au serveur',
                            color: 'red',
                            autoClose: 2000
                        });
                    }
                    
                });
            
        }

    }


    retourModMarqueur(retour:any): void {
        let mark = this.AjoutMarker(retour.json() as Marqueur);
        this.googlemarq[this.curidmarq].setMap(null);
        this.googlemarq.splice(this.curidmarq, 1, mark);
        if(this.modmarq){
            this.PermissionMod();
        }
    }

    Annulation():void{
        this.stadetrace = 0;
        this.tabmarqtemp.forEach((element) =>{
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
        this.currentmarqueur = new Marqueur(0,"",0,0,"",1,"","",Number(localStorage.getItem('profilId')),"");
        this.googlemarq.forEach((m) => {
            m.setAnimation(null);
        });
    }

    getMarqueurs(): void {
        this.http.get("api/marqueurs")
                .subscribe((resdata) => {
                    let marqueur:Marqueur[] = resdata.json() as Marqueur[];
                    marqueur.forEach((mark) => {
                       this.googlemarq.push(this.AjoutMarker(mark));
                    });
                });
    }

    AjoutMarker (info: Marqueur): any {
        var marker = new google.maps.Marker ({
            position: { lat:info.latitude,lng: info.longitude },
            map: this.map,
            icon: this.banqueimageicone[info.icone],
            title: info.nom,
            click: false,
            informationMarqueur: info,
            marqid: this.googlemarq.length
        });

        if(this.curidmarq < this.googlemarq.length)
        {
            marker.marqid = this.curidmarq;
        }

        var color:string = '#f3123d';
        if(info.icone > 0){
            color = '#84ffb8';
        }
        var chemin = new google.maps.Polyline ({
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });

        marker.addListener('click', () => {
            if(!marker.click) {
                this.map.setZoom(13);
                this.map.panTo(marker.position);
                if(!this.AcceptMarker && this.stadetrace===0){
                    this.currentmarqueur = info;
                    this.curidmarq = marker.marqid;
                    this.ref.detectChanges();
                    this.PermissionDetails();                  
                }

                
                if(info.trajetlat != "" && info.trajetlat != null && info.trajetlng != "" && info.trajetlng != null) {
                    let chlat = info.trajetlat.split(",");
                    let chlng = info.trajetlng.split(",");

                    let path = chemin.getPath();
                    path.push(new google.maps.LatLng(info.latitude,info.longitude));
                    for(let i = 0; i < chlat.length; i++) {
                        path.push(new google.maps.LatLng(chlat[i], chlng[i]))
                    }
                } 
                chemin.setMap(this.map);
                marker.click = true;
                if(this.stadetrace === 1){
                    this.stadetrace = 2;
                    chemin.setMap(null);
                    let path = this.tracetrajet.getPath();
                    path.push(marker.position);
                    this.googlemarq.forEach((m) => {
                        m.setAnimation(null);
                    });
                }
            } else {
                this.map.setZoom(10);
                this.PermissionDetails();
                chemin.setMap(null);
                marker.click = false;
                chemin = new google.maps.Polyline ({
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
        
        if(this.stadetrace === 2 || this.stadetrace === 3){
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
        if(this.currentmarqueur.id === 0){
            if(this.currentmarqueur.latitude == 0)
            {
                new jBox('Notice', {
                    content: 'Veuillez cliquer sur la map pour ajouter un marqueur',
                    color: 'red',
                    autoClose: 2000
                });
            }
            else {
                if(localStorage.getItem('profilId')!="")
                {   
                    let marqposition = this.marqtemp.getPosition();
                    this.currentmarqueur.latitude = marqposition.lat();
                    this.currentmarqueur.longitude = marqposition.lng();
                    this.currentmarqueur.profilId=Number(localStorage.getItem('profilId'));
                    this.currentmarqueur.imageMarqueur = this.image;
                    this.image = "";
                    this.http.post("api/marqueurs", this.currentmarqueur)
                    .subscribe( res => {
                        console.log(res);
                        this.googlemarq.push(this.AjoutMarker(res.json() as Marqueur));
                        this.PermissionAjoutMarker();
                        this.marqtemp.setMap(null);
                    });   
                }
                else{
                    new jBox('Notice', {
                        content: 'Veuillez créer un profil avant de créer un marqueur',
                        color: 'red',
                        autoClose: 2000
                    });
                }
                         
            }
        } else {
            if(this.currentmarqueur.icone > 0){
                this.http.post("api/marqueurs/modification",this.currentmarqueur)
                    .subscribe( res => {
                        if(res != null){
                            this.retourModMarqueur(res);
                        } else {
                            new jBox('Notice', {
                                content: 'Erreur de connection au serveur',
                                color: 'red',
                                autoClose: 2000
                            });
                        }
                    });
            }
        }
    }

    LoadDetails(){
        this.utilisateurService.getProfilById(String(this.currentmarqueur.profilId))
        .subscribe(res =>{
            this.googlemarq[this.curidmarq].creator=res.username;
            if(res.profilimage)
            {
                this.googlemarq[this.curidmarq].proimg=res.profilimage;
            } else {
                this.googlemarq[this.curidmarq].proimg="../../../images/hiker.jpg";
            }
            this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+this.currentmarqueur.latitude+'&lon='+this.currentmarqueur.longitude+'&APPID=43899e65e2972c9b020bf0aa269ab48a')
            .subscribe(res =>{
                var temp =res.json();
                this.googlemarq[this.curidmarq].temp= Math.round(temp.main.temp-273.15);
                this.googlemarq[this.curidmarq].weather=temp.weather[0].main;
                this.ref.detectChanges();
            });
        });
        
    } 

    ngOnInit() : void {
        var myCenter = { lat: 46.752560, lng: -71.228740 }; 
        var mapOptions = {
            zoom: 10,
            center: myCenter,
            mapTypeId: 'hybrid'
        }

        
        this.map = new google.maps.Map( document.getElementById('map'),mapOptions );
        this.getMarqueurs();
    
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
                    alert("Géolocalisation refusée, position par defaut : Lévis");
                });
        }

        this.map.addListener('click', (e:any):void => {
                this.CreationMaker(e);                  
        });

        this.tracetrajet.setMap(this.map);
    }
        
}