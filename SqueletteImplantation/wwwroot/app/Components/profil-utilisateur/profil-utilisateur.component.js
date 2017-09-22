"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var profilutilisateur_class_1 = require("./../../class/profilutilisateur.class");
var ProfilUtilisateurComponent = (function () {
    function ProfilUtilisateurComponent() {
    }
    ProfilUtilisateurComponent.prototype.ngOnInit = function () {
        this.profil = new profilutilisateur_class_1.ProfilUtilisateur(1, "a@a.a", "Arthur99", "Arthur", "Audet");
        this.email = localStorage.getItem('id_token');
    };
    return ProfilUtilisateurComponent;
}());
ProfilUtilisateurComponent = __decorate([
    core_1.Component({
        selector: 'profil-utilisateur',
        templateUrl: './profil-utilisateur.component.html'
    })
], ProfilUtilisateurComponent);
exports.ProfilUtilisateurComponent = ProfilUtilisateurComponent;
//# sourceMappingURL=profil-utilisateur.component.js.map