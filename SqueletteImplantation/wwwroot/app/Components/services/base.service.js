"use strict";
var Rx_1 = require("rxjs/Rx");
var BaseService = (function () {
    function BaseService() {
    }
    BaseService.prototype.handleError = function (error) {
        var applicationError = error.header.get('Application-Error');
        if (applicationError) {
            return Rx_1.Observable.throw(applicationError);
        }
        var modelStateErrors = '';
        var serverError = error.json();
        if (!serverError.type) {
            for (var key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Rx_1.Observable.throw(modelStateErrors || 'Server error');
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map