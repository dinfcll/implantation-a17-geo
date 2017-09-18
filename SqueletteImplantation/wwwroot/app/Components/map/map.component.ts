import { Component, Input ,OnInit } from '@angular/core';
import { Http } from '@angular/http';

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
     public btnAjout:String;
     public AcceptMarker:boolean;
     public TitreRando:string;
     public DescriptionRando:string;
     public Longitude:number;
     public Latitude:number;


     constructor(private http: Http) {
        this.getMarqueurs();
        this.btnAjout = "Ajout marqueur";
        this.AcceptMarker = false;
        this.Longitude = 0;
        this.Latitude = 0;
        this.TitreRando = "";
        this.DescriptionRando = "";
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
            map: this.map
        });

        var infoWindow = new google.maps.InfoWindow ({
            content:`
                <h2>`+info.nom+`</h2>
                <div *ngIf="info.desc">
                    `+info.desc+`
                </div>
            `
        });

        marker.addListener('click', function() {
            infoWindow.open(this.map, marker);
        });
        }
        
    CreationMaker(Gdonne:any){
        if(this.AcceptMarker){
            this.Latitude = Gdonne.latLng.lat();
            this.Longitude = Gdonne.latLng.lng();
        }
    }
    
    ConfirmationMarker(){
        var lat = this.Latitude;
        var lng = this.Longitude;
        var marker = new Marqueur(0, this.TitreRando, lat, lng, this.DescriptionRando); 
        this.AjoutMarker(marker);
        //manque ajout à la base de donnée
        this.Latitude = 0;
        this.Longitude = 0;
        this.TitreRando = "";
        this.DescriptionRando = "";
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
    
        var infoWindowLoc = new google.maps.InfoWindow({map:this.map});

        //géolocation
        if( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition (( position ) => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude   
                };
               
                infoWindowLoc.setPosition (pos);
                infoWindowLoc.setContent('Vous êtes ici');
                this.map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindowLoc, this.map.getCenter());
                });
        } else {
            //le navigateur ne supporte pas la géolocation
            handleLocationError(false, infoWindowLoc, this.map.getCenter());
        }
        
        function handleLocationError( NavigateurGeo: boolean, infoWindow: any, pos: any ) {
            infoWindow.setPosition(pos);
            if( NavigateurGeo )
            {
                infoWindow.setContent('Erreur : La géolocalisation à échouée' );    
            } else {
                infoWindow.setContent('Erreur : Votre navigateur ne supporte pas la géolocalisation.');
            }           
        }

        this.map.addListener('click', (e:any):void => {
            this.CreationMaker(e); 
        });
    }         
}