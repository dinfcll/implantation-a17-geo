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
var router_1 = require("@angular/router");
var utilisateur_service_1 = require("../../services/utilisateur.service");
var NavBarComponent = (function () {
    function NavBarComponent(utilisateurService, router, activatedRoute) {
        this.utilisateurService = utilisateurService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    ;
    NavBarComponent.prototype.onLogout = function () {
        this.utilisateurService.logout();
        this.router.navigate(['/login']);
    };
    NavBarComponent.prototype.onDeleteUser = function () {
        var _this = this;
        var email = localStorage.getItem('token');
        this.utilisateurService
            .deleteProfil(email)
            .subscribe(function (res) {
            if (res) {
                new jBox('Notice', {
                    content: 'Votre profil a été supprimé.',
                    color: 'blue',
                    autoClose: 2000
                });
            }
            else {
                new jBox('Notice', {
                    content: 'An error occured on delete pofil.',
                    color: 'red',
                    autoClose: 2000
                });
            }
        });
        this.utilisateurService
            .deleteUser(email)
            .subscribe(function (res) {
            if (res) {
                new jBox('Notice', {
                    content: 'Votre compte a été supprimé.',
                    color: 'blue',
                    autoClose: 2000
                });
                _this.router.navigate(['/login']);
            }
            else {
                new jBox('Notice', {
                    content: 'An error occured on delete user.',
                    color: 'red',
                    autoClose: 2000
                });
            }
        });
    };
    return NavBarComponent;
}());
NavBarComponent = __decorate([
    core_1.Component({
        selector: 'navBar',
        templateUrl: './nav.component.html',
        styleUrls: ['./nav.component.css']
    }),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService, router_1.Router,
        router_1.ActivatedRoute])
], NavBarComponent);
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=nav.component.js.map