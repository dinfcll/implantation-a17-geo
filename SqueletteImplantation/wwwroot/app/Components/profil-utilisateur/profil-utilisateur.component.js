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
var _1 = require("@angular/router/");
var profilutilisateur_class_1 = require("./../../class/profilutilisateur.class");
var utilisateur_service_1 = require("../../services/utilisateur.service");
var ProfilUtilisateurComponent = (function () {
    function ProfilUtilisateurComponent(utilisateurservice, router) {
        this.utilisateurservice = utilisateurservice;
        this.router = router;
        this.bEdit = false;
    }
    ProfilUtilisateurComponent.prototype.ngOnInit = function () {
        this.profil = new profilutilisateur_class_1.ProfilUtilisateur(null, this.utilisateurservice.loggedIn(), "", "", "");
        this.onGetProfil();
    };
    ProfilUtilisateurComponent.prototype.onGetProfil = function () {
        var _this = this;
        this.utilisateurservice
            .getProfil()
            .subscribe(function (res) {
            if (res) {
                _this.profil = res;
            }
            else {
                new jBox('Notice', {
                    content: 'Aucun profil trouvé. Vous pouvez en créer un',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    };
    ProfilUtilisateurComponent.prototype.onCreateProfil = function () {
        var _this = this;
        this.utilisateurservice
            .createProfil(this.profil.courriel, this.profil.username, this.profil.prenom, this.profil.nom)
            .subscribe(function (res) {
            if (res) {
                _this.profil = res;
                _this.router.navigate(['/profil']);
                new jBox('Notice', {
                    content: 'Création du profil réussie',
                    color: 'green',
                    autoClose: 5000
                });
            }
            else {
                new jBox('Notice', {
                    content: 'Impossible de créer un profil pour cet utilisateur ou le profil existe déjà',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    };
    ProfilUtilisateurComponent.prototype.editActif = function () {
        this.bEdit = true;
    };
    ProfilUtilisateurComponent.prototype.onEditProfil = function () {
        var _this = this;
        this.utilisateurservice
            .editProfil(this.profil.id, this.profil.courriel, this.profil.username, this.profil.prenom, this.profil.nom)
            .subscribe(function (res) {
            if (res) {
                _this.profil = res;
                localStorage.setItem('token', _this.profil.courriel);
                _this.bEdit = false;
                new jBox('Notice', {
                    content: 'Édition du profil réussie',
                    color: 'green',
                    autoClose: 5000
                });
            }
            else {
                new jBox('Notice', {
                    content: 'Impossible de modifier le profil pour cet utilisateur',
                    color: 'red',
                    autoClose: 5000
                });
            }
        });
    };
    ProfilUtilisateurComponent.prototype.onDeleteProfil = function () {
        var _this = this;
        var confirmation = false;
        confirmation = confirm("Voulez vous supprimer votre profil?");
        if (confirmation) {
            this.utilisateurservice.deleteProfil(this.profil.id)
                .subscribe(function (res) {
                if (res.status == 200) {
                    _this.profil = new profilutilisateur_class_1.ProfilUtilisateur(null, _this.utilisateurservice.loggedIn(), "", "", "");
                    new jBox('Notice', {
                        content: 'Suppression du profil réussie',
                        color: 'green',
                        autoClose: 5000
                    });
                }
                else {
                    new jBox('Notice', {
                        content: 'Impossible de supprimer le profil pour cet utilisateur',
                        color: 'red',
                        autoClose: 5000
                    });
                }
            });
        }
    };
    return ProfilUtilisateurComponent;
}());
ProfilUtilisateurComponent = __decorate([
    core_1.Component({
        selector: 'profil-utilisateur',
        templateUrl: './profil-utilisateur.component.html',
        styleUrls: ['./profil-utilisateur.component.css', './../../../lib/bootstrap/dist/css/bootstrap.css']
    }),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService, _1.Router])
], ProfilUtilisateurComponent);
exports.ProfilUtilisateurComponent = ProfilUtilisateurComponent;
//# sourceMappingURL=profil-utilisateur.component.js.map