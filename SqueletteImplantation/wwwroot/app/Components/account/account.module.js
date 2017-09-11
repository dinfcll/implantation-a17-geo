"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var utilisateur_service_1 = require("../services/utilisateur.service");
var email_validator_directive_1 = require("../account/email.validator.directive");
var account_routing_1 = require("./account.routing");
//import { LoginFormComponent } from '../loginform/loginform.component';
var AccountModule = (function () {
    function AccountModule() {
    }
    return AccountModule;
}());
AccountModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule, forms_1.FormsModule, account_routing_1.routing
        ],
        declarations: [
            email_validator_directive_1.EmailValidator
        ],
        providers: [utilisateur_service_1.UtilisateurService]
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map