import { Component,Input,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Marqueur } from "../class/marqueur.class";

declare var google: any;


@Component({
  selector: 'map',
  templateUrl:'./../view/map.html',

})
export class MapComponent implements OnInit  {
     name ='Map';
     private marqueurs:Marqueur[];
     public map:any;
     constructor(private http: Http){
        this.getMarqueurs();
    }
    getMarqueurs(): void {
        this.http.get("api/marqueurs")
                .subscribe((resdata) => {
                    console.log(resdata.json());
                    this.marqueurs = resdata.json() as Marqueur[];
                    console.log(this.marqueurs);
                    this.marqueurs.forEach((mark)=>{
                        this.AjoutMarker(mark);
                    });
                });
    }
    AjoutMarker(info:Marqueur){
        var lat=info.Latitude;
        var marker = new google.maps.Marker({
            position: {lat:lat,lng: info.Longitude},
            map: this.map
        });
        var infoWindow = new google.maps.InfoWindow({
            content:`
                <h2>{{info.Nom}}</h2>
                <div *ngIf="info.Desc">
                    {{info.Desc}}
                </div>
            `
        });
        marker.addListener('click', function(){
            infoWindow.open(this.map, marker);
        });
        }        
    ngOnInit():void{
        var myCenter = {lat: 46.752560, lng: -71.228740}; 
        var mapOptions = {
            zoom: 10,
            center: myCenter,
            mapTypeId: 'hybrid'
        }
        this.getMarqueurs();
        this.map = new google.maps.Map(document.getElementById('map'),mapOptions );
        var infoWindowLoc = new google.maps.InfoWindow({map:this.map});
        //géolocation
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude   
                };

                
                infoWindowLoc.setPosition(pos);
                infoWindowLoc.setContent('Vous êtes ici');
                this.map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindowLoc, this.map.getCenter());
            });
        } else {
            //le navigateur ne supporte pas la géolocation
            handleLocationError(false, infoWindowLoc, this.map.getCenter());
        }
        
        function handleLocationError(NavigateurGeo:boolean, infoWindow:any, pos:any ){
            infoWindow.setPosition(pos);
            if(NavigateurGeo)
            {
                infoWindow.setContent('Erreur : La géolocalisation à échouée' );    
            } else {
                infoWindow.setContent('Erreur : Vontre navigateur ne supporte pas la géolocalisation.');
            }           
        }
    }         
}