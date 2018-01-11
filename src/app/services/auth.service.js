"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
var environment_1 = require("../../environments/environment");
var AuthService = /** @class */ (function () {
    function AuthService(_http, _cookie, _router) {
        this._http = _http;
        this._cookie = _cookie;
        this._router = _router;
        this.authenticated = new BehaviorSubject_1.BehaviorSubject(this._cookie.check('auth'));
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var params = 'username=' + username + '&password=' + password + '&grant_type=password';
        var headers = new http_1.HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa(environment_1.environment.oauthClientId + ':' + environment_1.environment.oauthClientSecret));
        return this._http.post(environment_1.environment.rootPath + environment_1.environment.oauthTokenPath, params.toString(), { headers: headers })
            .map(function (re) {
            _this.setAuth(re);
            _this.authenticated.next(true);
            return re.access_token;
        }).catch(this.handleError);
    };
    AuthService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json()['error'] || 'Login error');
    };
    AuthService.prototype.logout = function () {
        this._cookie.delete('auth');
        this._cookie.delete('refresh');
        this.authenticated.next(false);
        this._router.navigate(['/']);
    };
    AuthService.prototype.canActivate = function (route, state) {
        return this.checkCredentials().map(function (token) {
            return token != null;
        });
    };
    AuthService.prototype.canLoad = function (route) {
        return this.checkCredentials().map(function (token) {
            return token != null;
        });
    };
    AuthService.prototype.checkCredentials = function () {
        if (this.getAuth()) {
            return Observable_1.Observable.of(this.getAuth());
        }
        else {
            if (this.getRefresh()) {
                return this.refreshAccessToken();
            }
            else {
                return Observable_1.Observable.of(null);
            }
        }
    };
    AuthService.prototype.refreshAccessToken = function () {
        var _this = this;
        if (!this.getRefresh()) {
            return;
        }
        var params = 'refresh_token=' + this.getRefresh() + '&grant_type=refresh_token';
        var headers = new http_1.HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa(environment_1.environment.oauthClientId + ':' + environment_1.environment.oauthClientSecret));
        return this._http.post(environment_1.environment.rootPath + environment_1.environment.oauthTokenPath, params, { headers: headers })
            .map(function (re) {
            _this.setAuth(re);
            _this.authenticated.next(true);
            return re.access_token;
        });
    };
    AuthService.prototype.getAuth = function () {
        return this._cookie.get('auth');
    };
    AuthService.prototype.getRefresh = function () {
        return this._cookie.get('refresh');
    };
    AuthService.prototype.setAuth = function (a) {
        this._cookie.set('auth', a.access_token, new Date(new Date().getTime() + a.expires_in * 1000));
        this._cookie.set('refresh', a.refresh_token);
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
