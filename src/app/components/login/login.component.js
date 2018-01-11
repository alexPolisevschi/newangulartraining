"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("../../domain/user");
var Observable_1 = require("rxjs/Observable");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authSvc, _rest) {
        this.authSvc = authSvc;
        this._rest = _rest;
        this.user = new user_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authSvc.authenticated
            .subscribe(function (isAuth) {
            if (isAuth) {
                _this._rest.getOne('api/user/me', true).subscribe(function (u) { return _this.user = u; });
            }
            else {
                Observable_1.Observable.of(null);
            }
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authSvc.login(this.user.username, this.user.password)
            .subscribe(function (token) { return _this._rest.getOne('api/user/me', true)
            .subscribe(function (u) { return _this.user = u; }); });
    };
    LoginComponent.prototype.logout = function () {
        this.user = new user_1.User();
        this.authSvc.logout();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
