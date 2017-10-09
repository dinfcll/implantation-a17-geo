import { Component, Input ,OnInit} from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from "../utils/config.service";
import { Marqueur } from "../../class/marqueur.class";

declare var google: any;
declare var jBox:any;

@Component ({
    moduleId: module.id,
    selector: 'map',
    templateUrl:'./map.html',
    styleUrls:['./map.component.css','./../../../lib/bootstrap/dist/css/bootstrap.css']
})

export class MapComponent implements OnInit {

     name ='Map';
     public currentmarqueur:Marqueur;
     public map:any;
     public btnAjout:string;
     public AcceptMarker:boolean;
     public Longitude:number;
     public Latitude:number;
     public baseUrl: string = '';
     public banqueimageicone: Array<string>;
     public marqtemp: any;
     public googlemarq: any[];
     public tabmarqtemp: any[];
     public stadetrace: number;//0-bouton non click 1-peux tracé 2-peux enregistrer(mins 1 point)
     public tracetrajet: any;

    constructor(private http: Http) {
        this.getMarqueurs();
        this.btnAjout = "Ajout marqueur";
        this.AcceptMarker = false;
        this.banqueimageicone = ['../../../images/officiel_icone.svg',
                            '../../../images/user_icone.svg'];
        this.currentmarqueur = new Marqueur(0,"",0,0,"",1,"","");
        this.marqtemp = new google.maps.Marker ({
            icon: this.banqueimageicone[1],
            draggable: true,
        });
        this.stadetrace = 0;
        this.googlemarq = new Array();
        this.tabmarqtemp = new Array();
        this.tracetrajet = new google.maps.Polyline({
            strokeColor: '#84ffb8',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });
    }

    PermissionAjoutMarker():void {
        this.AcceptMarker = !this.AcceptMarker;
        if(this.btnAjout === "Ajout marqueur") {
            this.btnAjout = "Annuler";
        } else {
            this.btnAjout = "Ajout marqueur";
            this.marqtemp.setMap(null);
        }       
    }

    ChangeStade():void {
        if(this.stadetrace < 1){
            this.stadetrace = 1;
            this.googlemarq.forEach((mark) => {
                mark.setAnimation(google.maps.Animation.BOUNCE);  
            });
        } else if(this.stadetrace === 3){
            //enregistrer dans la bd le tracer par coordonnée des marqueurs
            this.stadetrace = 0;
        }

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
            id: info.id,
            valicone: info.icone,
            desc: info.desc,
            trajetlat: info.trajetlat,
            trajetlng: info.trajetlng
        });

        google.maps.InfoWindow.prototype.ouvert = false;
        var infoWindow = new google.maps.InfoWindow ({
            content:`<div class="iw-titre"
                <h2>`+info.nom+`</h2></div>
                <div *ngIf="info.desc">
                    `+info.desc+`
                </div>
            `
        });

        var chemin = new google.maps.Polyline ({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });

        marker.addListener('click', () => {
            if(this.AcceptMarker == false){
                this.currentmarqueur = info;
            }
            if(!infoWindow.ouvert) {
                this.map.setZoom(13);
                this.map.panTo(marker.position);
                infoWindow.open(this.map, marker);
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
                infoWindow.ouvert = true;
                if(this.stadetrace === 1){
                    this.stadetrace = 2;
                    let path = this.tracetrajet.getPath();
                    path.push(marker.position);
                }
            } else {
                this.map.setZoom(10);
                infoWindow.close();
                chemin.setMap(null);
                infoWindow.ouvert = false;
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
            //permet de tracer
            if(this.tabmarqtemp.length > 0){
                this.stadetrace = 3;
            }

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
        if(this.currentmarqueur.latitude == 0)
        {
            new jBox('Notice', {
                content: 'Veuillez cliquer sur la map pour ajouter un marqueur',
                color: 'red',
                autoClose: 2000
            });
        }
        else {
            let marqposition = this.marqtemp.getPosition();
            this.currentmarqueur.latitude = marqposition.lat();
            this.currentmarqueur.longitude = marqposition.lng();
            this.http.post("api/marqueurs", this.currentmarqueur)
            .subscribe( res => {
                this.googlemarq.push(this.AjoutMarker(res.json() as Marqueur));
                this.PermissionAjoutMarker();
                this.AjoutMarker(this.currentmarqueur);
            });            
        }
    }

    ngOnInit() : void {
        var myCenter = { lat: 46.752560, lng: -71.228740 }; 
        var mapOptions = {
            zoom: 10,
            center: myCenter,
            mapTypeId: 'hybrid'
        }

        this.getMarqueurs();
        this.map = new google.maps.Map( document.getElementById('map'),mapOptions );
    
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

                //this.currentmarqueur.latitude=e.latLng.lat();
                //this.currentmarqueur.longitude=e.latLng.lng();

                this.CreationMaker(e);                  
        });

        this.tracetrajet.setMap(this.map);
    }         
}