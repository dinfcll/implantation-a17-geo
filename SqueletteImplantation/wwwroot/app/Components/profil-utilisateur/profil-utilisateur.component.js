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
var profilutilisateur_class_1 = require("./../../class/profilutilisateur.class");
var utilisateur_service_1 = require("../../services/utilisateur.service");
var ProfilUtilisateurComponent = (function () {
    function ProfilUtilisateurComponent(utilisateurservice) {
        this.utilisateurservice = utilisateurservice;
    }
    ProfilUtilisateurComponent.prototype.ngOnInit = function () {
        this.profil = new profilutilisateur_class_1.ProfilUtilisateur(null, this.utilisateurservice.loggedIn(), null, null, null);
        this.email = this.utilisateurservice.loggedIn();
        this.getProfil();
    };
    ProfilUtilisateurComponent.prototype.getProfil = function () {
        var _this = this;
        this.utilisateurservice
            .getProfil()
            .subscribe(function (res) {
            if (res) {
                _this.profil = res;
            }
            else {
                alert('pas de profil trouvé pour cet utilisateur');
            }
        });
    };
    return ProfilUtilisateurComponent;
}());
ProfilUtilisateurComponent = __decorate([
    core_1.Component({
        selector: 'profil-utilisateur',
        templateUrl: './profil-utilisateur.component.html'
    }),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService])
], ProfilUtilisateurComponent);
exports.ProfilUtilisateurComponent = ProfilUtilisateurComponent;
//# sourceMappingURL=profil-utilisateur.component.js.map