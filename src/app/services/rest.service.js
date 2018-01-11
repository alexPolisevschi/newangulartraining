"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/map");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../environments/environment");
var RestService = /** @class */ (function () {
    function RestService(_http, _auth) {
        this._http = _http;
        this._auth = _auth;
    }
    RestService.prototype.getList = function (path, query, authenticate) {
        var _this = this;
        if (authenticate === void 0) { authenticate = true; }
        var params = new http_1.HttpParams();
        for (var k in query) {
            params = params.append(k, '' + query[k]);
        }
        if (authenticate) {
            return this._auth.checkCredentials().switchMap(function (tk) {
                if (tk !== null) {
                    var headers = new http_1.HttpHeaders()
                        .set('Authorization', 'Bearer ' + tk);
                    return _this._http.get(environment_1.environment.rootPath + path, { params: params, headers: headers });
                }
            });
        }
        else {
            return this._http.get(environment_1.environment.rootPath + path, { params: params });
        }
    };
    RestService.prototype.getOne = function (path, authenticate) {
        var _this = this;
        if (authenticate === void 0) { authenticate = true; }
        if (authenticate) {
            return this._auth.checkCredentials().switchMap(function (tk) {
                if (tk !== null) {
                    var headers = new http_1.HttpHeaders()
                        .set('Authorization', 'Bearer ' + tk);
                    return _this._http.get(environment_1.environment.rootPath + path, { headers: headers });
                }
            });
        }
        else {
            return this._http.get(environment_1.environment.rootPath + path, {});
        }
    };
    RestService.prototype.delete = function (path, authenticate) {
        var _this = this;
        if (authenticate === void 0) { authenticate = true; }
        if (authenticate) {
            return this._auth.checkCredentials().switchMap(function (tk) {
                if (tk !== null) {
                    var headers = new http_1.HttpHeaders()
                        .set('Authorization', 'Bearer ' + tk);
                    return _this._http.delete(environment_1.environment.rootPath + path, { headers: headers }).map(function (a) { return true; }).catch(function (e) { return Observable_1.Observable.of(false); });
                }
            });
        }
        else {
            return this._http.delete(environment_1.environment.rootPath + path).map(function (a) { return true; }).catch(function (e) { return Observable_1.Observable.of(false); });
        }
    };
    RestService.prototype.update = function (path, entity, authenticate) {
        var _this = this;
        if (authenticate === void 0) { authenticate = true; }
        if (authenticate) {
            return this._auth.checkCredentials().switchMap(function (tk) {
                if (tk !== null) {
                    var headers = new http_1.HttpHeaders()
                        .set('Authorization', 'Bearer ' + tk);
                    return _this._http.put(environment_1.environment.rootPath + path, entity, { headers: headers });
                }
            });
        }
        else {
            return this._http.put(environment_1.environment.rootPath + path, entity);
        }
    };
    RestService.prototype.create = function (path, entity, authenticate) {
        var _this = this;
        if (authenticate === void 0) { authenticate = true; }
        if (authenticate) {
            return this._auth.checkCredentials().switchMap(function (tk) {
                if (tk !== null) {
                    var headers = new http_1.HttpHeaders()
                        .set('Authorization', 'Bearer ' + tk);
                    return _this._http.post(environment_1.environment.rootPath + path, entity, { headers: headers });
                }
            });
        }
        else {
            return this._http.post(environment_1.environment.rootPath + path, entity);
        }
    };
    RestService = __decorate([
        core_1.Injectable()
    ], RestService);
    return RestService;
}());
exports.RestService = RestService;
