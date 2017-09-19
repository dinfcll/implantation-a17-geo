"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var MapComponent = (function () {
    function MapComponent(http) {
        this.http = http;
        this.baseUrl = '';
        this.name = 'Map';
        this.getMarqueurs();
    }
    MapComponent.prototype.getMarqueurs = function () {
        var _this = this;
        this.http.get("api/marqueurs")
            .subscribe(function (resdata) {
            _this.marqueurs = resdata.json();
            _this.marqueurs.forEach(function (mark) {
                _this.AjoutMarker(mark);
            });
        });
    };
    MapComponent.prototype.AjoutMarker = function (info) {
        var marker = new google.maps.Marker({
            position: { lat: info.latitude, lng: info.longitude },
            map: this.map
        });
        var infoWindow = new google.maps.InfoWindow({
            content: "\n                <h2>" + info.nom + "</h2>\n                <div *ngIf=\"info.desc\">\n                    " + info.desc + "\n                </div>\n            "
        });
        marker.addListener('click', function () {
            infoWindow.open(this.map, marker);
        });
    };
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        var myCenter = { lat: 46.752560, lng: -71.228740 };
        var mapOptions = {
            zoom: 10,
            center: myCenter,
            mapTypeId: 'hybrid'
        };
        this.getMarqueurs();
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var infoWindowLoc = new google.maps.InfoWindow({ map: this.map });
        //géolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindowLoc.setPosition(pos);
                infoWindowLoc.setContent('Vous êtes ici');
                _this.map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindowLoc, this.map.getCenter());
            });
        }
        else {
            //le navigateur ne supporte pas la géolocation
            handleLocationError(false, infoWindowLoc, this.map.getCenter());
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
        moduleId: module.id,
        selector: 'map',
        templateUrl: './map.html',
    }),
    __metadata("design:paramtypes", [http_1.Http])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map