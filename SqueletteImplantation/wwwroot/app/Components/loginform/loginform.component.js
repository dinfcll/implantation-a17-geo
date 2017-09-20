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
var utilisateur_service_1 = require("./../../services/utilisateur.service");
var LoginFormComponent = (function () {
    function LoginFormComponent(utilisateurService, router, activatedRoute) {
        this.utilisateurService = utilisateurService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.binscription = false;
    }
    LoginFormComponent.prototype.onLogin = function (email, mdp) {
        var _this = this;
        this.utilisateurService
            .login(email, mdp)
            .subscribe(function (res) {
            if (res) {
                localStorage.setItem('token', res.email),
                    _this.router.navigate(['/map']);
            }
            else
                alert("Courriel ou mot de passe invalide");
        });
    };
    LoginFormComponent.prototype.toggleInscription = function () {
        this.binscription = true;
    };
    LoginFormComponent.prototype.inscription = function (mail, mdp, cmdp) {
        var _this = this;
        if (mdp != cmdp)
            alert("Les mots de passe sont différents");
        else {
            this.utilisateurService
                .signin(mail, mdp)
                .subscribe(function (res) {
                if (res) {
                    localStorage.setItem('token', mail);
                    _this.router.navigate(['/map']);
                }
                else
                    alert("Il y a déjà un compte lié à ce courriel.");
            });
        }
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    core_1.Component({
        selector: 'loginForm',
        templateUrl: './loginform.component.html',
        styleUrls: ['./loginform.component.css']
    }),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService, router_1.Router,
        router_1.ActivatedRoute])
], LoginFormComponent);
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=loginform.component.js.map