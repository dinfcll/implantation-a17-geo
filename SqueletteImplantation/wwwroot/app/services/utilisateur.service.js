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
var base_service_1 = require("./base.service");
var config_service_1 = require("../Components/utils/config.service");
var UtilisateurService = (function (_super) {
    __extends(UtilisateurService, _super);
    function UtilisateurService(http, configService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.configService = configService;
        _this.baseUrl = '';
        _this.baseUrl = configService.getApiURI();
        return _this;
    }
    UtilisateurService.prototype.login = function (email, mdp) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/utilisateur/login', JSON.stringify({ email: email, mdp: mdp }), { headers: headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    UtilisateurService.prototype.loggedIn = function () {
        return localStorage.getItem('token');
    };
    UtilisateurService.prototype.logout = function () {
        localStorage.removeItem('token');
    };
    UtilisateurService.prototype.newPW = function (mdp, email) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/utilisateur/newpw', JSON.stringify({ email: email, mdp: mdp }), { headers: headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    UtilisateurService.prototype.reset = function (email) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/utilisateur/reset', JSON.stringify({ email: email }), { headers: headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    UtilisateurService.prototype.signin = function (email, mdp) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/utilisateur/signin', JSON.stringify({ email: email, mdp: mdp }), { headers: headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    UtilisateurService.prototype.getProfil = function () {
        return this.http
            .get(this.baseUrl + '/profil/' + this.loggedIn(), this.loggedIn())
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    UtilisateurService.prototype.createProfil = function (courriel, username, prenom, nom) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/profil/create', JSON.stringify({ courriel: courriel, username: username, prenom: prenom, nom: nom }), { headers: headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
<<<<<<< HEAD
    UtilisateurService.prototype.editProfil = function (id, courriel, username, prenom, nom) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .put(this.baseUrl + '/profil/edit', JSON.stringify({ id: id, courriel: courriel, username: username, prenom: prenom, nom: nom }), { headers: headers })
=======
    UtilisateurService.prototype.deleteProfil = function (email) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/profil/delete', JSON.stringify({ email: email }), { headers: headers })
>>>>>>> 29c82a8ecbf4efde1c5f2b461ce07c91b9a02f38
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
<<<<<<< HEAD
    UtilisateurService.prototype.deleteProfil = function (id) {
        return this.http
            .delete(this.baseUrl + '/profil/delete/' + id, JSON.stringify({ id: id }))
            .map(function (res) {
            return res;
=======
    UtilisateurService.prototype.deleteUser = function (email) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/profil/delete', JSON.stringify({ email: email }), { headers: headers })
            .map(function (res) {
            return res.json();
>>>>>>> 29c82a8ecbf4efde1c5f2b461ce07c91b9a02f38
        })
            .catch(this.handleError);
    };
    return UtilisateurService;
}(base_service_1.BaseService));
UtilisateurService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService])
], UtilisateurService);
exports.UtilisateurService = UtilisateurService;
//# sourceMappingURL=utilisateur.service.js.map