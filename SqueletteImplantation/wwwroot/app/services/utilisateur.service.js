"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require("@angular/http");
var config_service_1 = require("../utils/config.service");
var base_service_1 = require("./base.service");
var Rx_1 = require("rxjs/Rx");
var UtilisateurService = (function (_super) {
    __extends(UtilisateurService, _super);
    function UtilisateurService(http, configService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.configService = configService;
        _this.baseUrl = '';
        _this._authNavStatusSource = new Rx_1.BehaviorSubject(false);
        _this.authNavStatus$ = _this._authNavStatusSource.asObservable();
        _this.loggedIn = false;
        _this.baseUrl = configService.getApiURI();
        return _this;
    }
    UtilisateurService.prototype.login = function (email, mdp) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/utilisateur/login', JSON.stringify({ email: email, mdp: mdp }), { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            _this.loggedIn = true;
            _this._authNavStatusSource.next(true);
            return true;
        })
            .catch(this.handleError);
    };
    UtilisateurService.prototype.logout = function () {
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    };
    UtilisateurService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    return UtilisateurService;
}(base_service_1.BaseService));
UtilisateurService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService])
], UtilisateurService);
exports.UtilisateurService = UtilisateurService;
//# sourceMappingURL=utilisateur.service.js.map