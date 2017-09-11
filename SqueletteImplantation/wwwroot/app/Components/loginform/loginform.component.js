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
var utilisateur_service_1 = require("../services/utilisateur.service");
var LoginFormComponent = (function () {
    function LoginFormComponent(utilisateurService, router, activatedRoute) {
        this.utilisateurService = utilisateurService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.credentials = { id: -1, email: '', mdp: '' };
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.queryParams.subscribe(function (param) {
            _this.brandNew = param['brandNew'];
            _this.credentials.email = param['email'];
        });
    };
    LoginFormComponent.prototype.login = function (mail, mot) {
        var _this = this;
        this.isRequesting = true;
        this.errors = '';
        //if (valid) {
        this.utilisateurService.login(mail, mot)
            .finally(function () { return _this.isRequesting = false; })
            .subscribe(function (result) {
            if (result) {
                _this.router.navigate(['/utilisateur']);
            }
        }, function (error) { return _this.errors = error; });
        //}
        //return true;
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    core_1.Component({
        selector: 'loginForm',
        templateUrl: './loginform.component.html',
        styleUrls: ['./loginform.component.css']
    }),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService, router_1.Router, router_1.ActivatedRoute])
], LoginFormComponent);
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=loginform.component.js.map