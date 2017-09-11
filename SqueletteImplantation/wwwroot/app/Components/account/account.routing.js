"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var map_component_1 = require("../map/map.component");
var loginform_component_1 = require("../loginform/loginform.component");
exports.routing = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: loginform_component_1.LoginFormComponent },
    { path: 'map', component: map_component_1.MapComponent }
];
var AccountRouting = (function () {
    function AccountRouting() {
    }
    return AccountRouting;
}());
AccountRouting = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(exports.routing)],
        exports: [router_1.RouterModule]
    })
], AccountRouting);
exports.AccountRouting = AccountRouting;
//# sourceMappingURL=account.routing.js.map