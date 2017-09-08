import { Component,Input,OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
declare var google: any;


@Component({
  selector: 'map',
  templateUrl:'./../view/map.html',

})
export class MapComponent implements OnInit  {
     name :'Angular';
     ngOnInit():void{

        var myCenter = {lat: 46.752560, lng: -71.228740}; 
        var mapOptions = {
            zoom: 10,
            center: myCenter,
            mapTypeId: 'hybrid'
        }
        var map = new google.maps.Map(document.getElementById('map'),mapOptions );


        var markers = [
            {
                coords:{lat: 46.890870 , lng: -71.147684},
                content:`
                    <h3>PARC DE LA CHUTE-MONTMORENCY</h3>
                    <p>L'Ascension tyro 120 (avec guide)</p>
                    <p>L'Explorateur (avec guide)</p>
                    <p>Torrent de Montmorency (avec guide)</p>
                    `
            },
            {
                coords:{lat: 46.773496 , lng: -71.174394},
                content: `
                    <h1>PARC VALÉRO</h1>
                    <p>Milieux forestiers feuillus, 
                    font une érablière à hêtres et une chênaie rouge,
                     milieux humides et friches</p>
                    `
            },
            {
                coords:{lat: 46.983613 , lng: -71.269260},
                content: '<h1>Sentiers du Moulin</h1>'
            },
            {
                coords:{lat: 46.838434 , lng: -71.343346},
                content: '<h1>Parc Chauveau</h1>'
            },
            {
                coords:{lat: 46.883102 , lng: -71.258831},
                content: '<h1>Parc de la Montagne-des-Roches</h1>'
            }
        ];

        markers.forEach(function(mark){
            AjoutMarker(mark);
        });

        function AjoutMarker(info:any){
            var marker = new google.maps.Marker({
                position: info.coords,
                map: map
            });
            
            if(info.content){
                var infoWindow = new google.maps.InfoWindow({
                    content: info.content
                });

                marker.addListener('click', function(){
                    infoWindow.open(map, marker);
                });
            }
            
        }

        var infoWindowLoc = new google.maps.InfoWindow({map:map});
        //géolocation
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude   
                };

                
                infoWindowLoc.setPosition(pos);
                infoWindowLoc.setContent('Vous êtes ici');
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindowLoc, map.getCenter());
            });
        } else {
            //le navigateur ne supporte pas la géolocation
            handleLocationError(false, infoWindowLoc, map.getCenter());
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