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
var LoginFormComponent = (function () {
    function LoginFormComponent(router) {
        this.router = router;
    }
    LoginFormComponent.prototype.ngOnInit = function () { };
    LoginFormComponent.prototype.loginUser = function (e) {
        e.preventDefault();
        var email = e.target.element[0].value;
        var mdp = e.target.element[1].value;
        if (email == 'admin' && mdp == 'admin') {
            this.router.navigate(['map']);
        }
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    core_1.Component({
        selector: 'app-loginForm',
        templateUrl: './loginform.component.html',
        styleUrls: ['./loginform.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], LoginFormComponent);
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=loginform.component.js.map