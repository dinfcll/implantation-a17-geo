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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var marqueur_class_1 = require("../../class/marqueur.class");
var MapComponent = (function () {
    function MapComponent(http) {
        this.http = http;
        this.name = 'Map';
        this.baseUrl = '';
        this.getMarqueurs();
        this.btnAjout = "Ajout marqueur";
        this.AcceptMarker = false;
        this.banqueimageicone = ['../../../images/officiel_icone.svg',
            '../../../images/user_icone.svg'];
        this.currentmarqueur = new marqueur_class_1.Marqueur(0, "", 0, 0, "", 1, "", "");
        this.marqtemp = new google.maps.Marker({
            icon: this.banqueimageicone[1],
            draggable: true,
        });
    }
    MapComponent.prototype.PermissionAjoutMarker = function () {
        this.AcceptMarker = !this.AcceptMarker;
        if (this.btnAjout === "Ajout marqueur") {
            this.btnAjout = "Annuler";
        }
        else {
            this.btnAjout = "Ajout marqueur";
            this.marqtemp.setMap(null);
        }
    };
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
        var _this = this;
        var marker = new google.maps.Marker({
            position: { lat: info.latitude, lng: info.longitude },
            map: this.map,
            icon: this.banqueimageicone[info.icone],
            title: info.nom
        });
        google.maps.InfoWindow.prototype.ouvert = false;
        var infoWindow = new google.maps.InfoWindow({
            content: "<div class=\"iw-titre\"\n                <h2>" + info.nom + "</h2></div>\n                <div *ngIf=\"info.desc\">\n                    " + info.desc + "\n                </div>\n            "
        });
        var chemin = new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            path: []
        });
        marker.addListener('click', function () {
            if (!infoWindow.ouvert) {
                _this.map.setZoom(13);
                _this.map.panTo(marker.position);
                infoWindow.open(_this.map, marker);
                if (info.trajetlat != "" && info.trajetlat != null && info.trajetlng != "" && info.trajetlng != null) {
                    var chlat = info.trajetlat.split(",");
                    var chlng = info.trajetlng.split(",");
                    var path = chemin.getPath();
                    path.push(new google.maps.LatLng(info.latitude, info.longitude));
                    for (var i = 0; i < chlat.length; i++) {
                        path.push(new google.maps.LatLng(chlat[i], chlng[i]));
                    }
                }
                chemin.setMap(_this.map);
                infoWindow.ouvert = true;
            }
            else {
                _this.map.setZoom(10);
                infoWindow.close();
                chemin.setMap(null);
                infoWindow.ouvert = false;
            }
        });
    };
    MapComponent.prototype.CreationMaker = function (Gdonne) {
        if (this.AcceptMarker) {
            this.currentmarqueur.latitude = Gdonne.latLng.lat();
            this.currentmarqueur.longitude = Gdonne.latLng.lng();
            this.marqtemp.setPosition({ lat: this.currentmarqueur.latitude, lng: this.currentmarqueur.longitude });
            this.marqtemp.setMap(null);
            this.marqtemp.setMap(this.map);
        }
    };
    MapComponent.prototype.ConfirmationMarker = function () {
        var _this = this;
        var marqposition = this.marqtemp.getPosition();
        this.currentmarqueur.latitude = marqposition.lat();
        this.currentmarqueur.longitude = marqposition.lng();
        this.AjoutMarker(this.currentmarqueur);
        this.http.post("api/marqueurs", this.currentmarqueur)
            .subscribe(function (res) {
            _this.marqueurs.push(res.json());
        });
        this.PermissionAjoutMarker();
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
        //géolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var marker = new google.maps.Marker({
                    position: pos,
                    map: _this.map,
                    icon: '../../../images/ici_icone.svg'
                });
                _this.map.setCenter(pos);
            }, function () {
                alert("Géolocalisation refusée, position par defaut : Lévis");
            });
        }
        this.map.addListener('click', function (e) {
            _this.CreationMaker(e);
        });
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'map',
        templateUrl: './map.html',
        styleUrls: ['./map.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map