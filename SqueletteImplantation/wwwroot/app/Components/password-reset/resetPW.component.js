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
var router_1 = require("@angular/router");
var utilisateur_service_1 = require("./../../services/utilisateur.service");
var ResetPWComponent = (function () {
    function ResetPWComponent(utilisateurService, router, activatedRoute) {
        this.utilisateurService = utilisateurService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.binscription = false;
    }
    ResetPWComponent.prototype.resetPW = function (mdp, confirm) {
        var _this = this;
        if (mdp != confirm) {
            new jBox('Notice', {
                content: 'Les mots de passe sont differents',
                color: 'yellow',
                autoClose: 2000
            });
        }
        else {
            var email = localStorage.getItem('token');
            this.utilisateurService.newPW(mdp, email)
                .subscribe(function (res) {
                if (res) {
                    _this.router.navigate(['/map']);
                }
                else {
                    new jBox('Notice', {
                        content: 'Un problème est survenue , veuillez essayer plus tard',
                        color: 'red',
                        autoClose: 2000
                    });
                }
            });
        }
    };
    return ResetPWComponent;
}());
ResetPWComponent = __decorate([
    core_1.Component({
        selector: 'resetPW',
        templateUrl: './resetPW.component.html',
        styleUrls: ['./resetPW.component.css']
    }),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService, router_1.Router,
        router_1.ActivatedRoute])
], ResetPWComponent);
exports.ResetPWComponent = ResetPWComponent;
//# sourceMappingURL=resetPW.component.js.map