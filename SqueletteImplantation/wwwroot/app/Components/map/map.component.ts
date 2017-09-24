import { Component, Input ,OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from "../utils/config.service";
import { Marqueur } from "../../class/marqueur.class";

declare var google: any;

@Component ({
    moduleId: module.id,
    selector: 'map',
    templateUrl:'./map.html',
})

export class MapComponent implements OnInit {

     name ='Map';
     private marqueurs:Marqueur[];
     public map:any;
     public btnAjout:string;
     public AcceptMarker:boolean;
     public Longitude:number;
     public Latitude:number;
     public baseUrl: string = '';
     public banqueimageicone: Array<string>;

    constructor(private http: Http) {
        this.getMarqueurs();
        this.btnAjout = "Ajout marqueur";
        this.AcceptMarker = false;
        this.banqueimageicone = ['../../../images/officiel_icone.svg',
                            '../../../images/user_icone.svg'];
    }

    PermissionAjoutMarker():void{
        this.AcceptMarker = !this.AcceptMarker;
        if(this.btnAjout === "Ajout marqueur"){
            this.btnAjout = "Annuler";
        } else {
            this.btnAjout = "Ajout marqueur";
        }
    }

    getMarqueurs(): void {
        this.http.get("api/marqueurs")
                .subscribe((resdata) => {
                    this.marqueurs = resdata.json() as Marqueur[];
                    this.marqueurs.forEach((mark) => {
                        this.AjoutMarker(mark);
                    });
                });
    }

    AjoutMarker (info: Marqueur) {
        var marker = new google.maps.Marker ({
            position: { lat:info.latitude,lng: info.longitude },
            map: this.map,
            icon: this.banqueimageicone[info.icone]
        });

        google.maps.InfoWindow.prototype.ouvert = false;
        var infoWindow = new google.maps.InfoWindow ({
            content:`
                <h2>`+info.nom+`</h2>
                <div *ngIf="info.desc">
                    `+info.desc+`
                </div>
            `
        });

        var chemin = new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });



        marker.addListener('click', () => {
            if(!infoWindow.ouvert){
                infoWindow.open(this.map, marker);
                let path = chemin.getPath();
                path.push(new google.maps.LatLng(info.latitude,info.longitude));
                path.push(new google.maps.LatLng(41.879, -87.624));
                path.push(new google.maps.LatLng(42.879, -88.624));
                path.push(new google.maps.LatLng(info.latitude,info.longitude));
                chemin.setMap(this.map);
                infoWindow.ouvert = true;
            } else {
                infoWindow.close();
                chemin.setMap(null);
                infoWindow.ouvert = false;
            }
        });
    }
        
    CreationMaker(Gdonne:any){
        if(this.AcceptMarker){
            this.Latitude = Gdonne.latLng.lat();
            this.Longitude = Gdonne.latLng.lng();
        }
    }
    
    ConfirmationMarker(titre:string, description:string){
        var lat = this.Latitude;
        var lng = this.Longitude;
        var marker = new Marqueur(0, titre, lat, lng, description,1); 
        this.AjoutMarker(marker);
        
        
        this.http.post("api/marqueurs", marker)
            .subscribe((res) => {
                console.log(res.json());
            });

        this.Latitude = 0;
        this.Longitude = 0;
        this.PermissionAjoutMarker();
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
                    alert("Géolocalisation refusé, position par défaut est à Lévis");
                });
        }

        this.map.addListener('click', (e:any):void => {
            this.CreationMaker(e); 
        });

    }         
}