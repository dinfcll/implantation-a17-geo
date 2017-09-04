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
        var marker = new google.maps.Marker({
            position: Rando1,
            map: map
        });
        var marker = new google.maps.Marker({
            position: Rando2,
            map: map
        });
        var marker = new google.maps.Marker({
            position: Rando3,
            map: map
        });
        var marker = new google.maps.Marker({
            position: Rando4,
            map: map
        });
        var marker = new google.maps.Marker({
            position: Rando5,
            map: map
        });
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        selector: 'map',
        templateUrl: './view/map.html',
        styleUrls: ['./../css/styles.css', './../lib/font-awesome-4.7.0/css/font-awesome.css', './../lib/bootstrap/dist/css/bootstrap.min.css']
    })
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map