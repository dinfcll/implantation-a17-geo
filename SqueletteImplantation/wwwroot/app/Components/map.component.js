"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var MapComponent = (function () {
    function MapComponent() {
    }
    MapComponent.prototype.ngOnInit = function () {
        var Rando1 = { lat: 47.048447, lng: -71.810291 };
        var Rando2 = { lat: 46.610968, lng: -70.768750 };
        var Rando3 = { lat: 46.792429, lng: -71.529966 };
        var Rando4 = { lat: 46.915765, lng: -70.266656 };
        var Rando5 = { lat: 46.899874, lng: -71.026866 };
        var myCenter = { lat: 46.752560, lng: -71.228740 };
        var mapOptions = {
            zoom: 10,
            center: myCenter,
            mapTypeId: 'hybrid'
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var markers = [
            {
                coords: { lat: 46.890870, lng: -71.147684 },
                content: "\n                    <h3>PARC DE LA CHUTE-MONTMORENCY</h3>\n                    <p>L'Ascension tyro 120 (avec guide)</p>\n                    <p>L'Explorateur (avec guide)</p>\n                    <p>Torrent de Montmorency (avec guide)</p>\n                    "
            },
            {
                coords: { lat: 46.773496, lng: -71.174394 },
                content: "\n                    <h1>PARC VAL\u00C9RO</h1>\n                    <p>Milieux forestiers feuillus, \n                    font une \u00E9rabli\u00E8re \u00E0 h\u00EAtres et une ch\u00EAnaie rouge,\n                     milieux humides et friches</p>\n                    "
            },
            {
                coords: { lat: 46.983613, lng: -71.269260 },
                content: '<h1>Sentiers du Moulin</h1>'
            },
            {
                coords: { lat: 46.838434, lng: -71.343346 },
                content: '<h1>Parc Chauveau</h1>'
            },
            {
                coords: { lat: 46.883102, lng: -71.258831 },
                content: '<h1>Parc de la Montagne-des-Roches</h1>'
            }
        ];
        markers.forEach(function (mark) {
            AjoutMarker(mark);
        });
        function AjoutMarker(info) {
            var marker = new google.maps.Marker({
                position: info.coords,
                map: map
            });
            if (info.content) {
                var infoWindow = new google.maps.InfoWindow({
                    content: info.content
                });
                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });
            }
        }
        var infoWindowLoc = new google.maps.InfoWindow({ map: map });
        //géolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindowLoc.setPosition(pos);
                infoWindowLoc.setContent('Vous êtes ici');
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindowLoc, map.getCenter());
            });
        }
        else {
            //le navigateur ne supporte pas la géolocation
            handleLocationError(false, infoWindowLoc, map.getCenter());
        }
        function handleLocationError(NavigateurGeo, infoWindow, pos) {
            infoWindow.setPosition(pos);
            if (NavigateurGeo) {
                infoWindow.setContent('Erreur : La géolocalisation à échouée');
            }
            else {
                infoWindow.setContent('Erreur : Vontre navigateur ne supporte pas la géolocalisation.');
            }
        }
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        selector: 'map',
        templateUrl: './../view/map.html',
    })
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map