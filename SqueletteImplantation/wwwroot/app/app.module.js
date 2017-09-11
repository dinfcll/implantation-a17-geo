"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var footer_component_1 = require("./Components/footer/footer.component");
var header_component_1 = require("./Components/header/header.component");
var loginform_component_1 = require("./Components/loginform/loginform.component");
var account_routing_1 = require("./Components/account/account.routing");
var config_service_1 = require("./Components/utils/config.service");
var utilisateur_service_1 = require("./Components/services/utilisateur.service");
var email_validator_directive_1 = require("./Components/account/email.validator.directive");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            footer_component_1.FooterComponent, header_component_1.HeaderComponent,
            loginform_component_1.LoginFormComponent, email_validator_directive_1.EmailValidator
        ],
        imports: [
            common_1.CommonModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            account_routing_1.routing
        ],
        providers: [
            config_service_1.ConfigService,
            utilisateur_service_1.UtilisateurService
        ],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map