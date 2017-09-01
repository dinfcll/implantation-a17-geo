"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UtilConnexionComponent = (function () {
    function UtilConnexionComponent() {
    }
    return UtilConnexionComponent;
}());
UtilConnexionComponent = __decorate([
    core_1.Component({
        selector: 'util-connexion',
        template: "\n    <h1>titre chose</h1>\n\t<label for=\"courriel\">Courriel</label>\n\t<input type=\"email\" id=\"courriel\" name=\"courriel\"/>\n\t<br>\n\t<label for=\"mdp\">Mot de passe</label>\n\t<input type=\"password\" id=\"mdp\" name=\"mdp\"/>\n\t<br>\n\t<input type=\"submit\" value=\"Connexion\"/>\n    "
    })
], UtilConnexionComponent);
exports.UtilConnexionComponent = UtilConnexionComponent;
//# sourceMappingURL=util-connexion.component.js.map