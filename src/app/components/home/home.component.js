"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_rest) {
        this._rest = _rest;
        this.page = 0;
        this.searchTerm = '';
        this.sortCol = 'publishDate';
        this.sortDir = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.load();
    };
    HomeComponent.prototype.load = function () {
        var _this = this;
        var query = {};
        query.size = environment_1.environment.pageSize;
        query.search = this.searchTerm;
        query.page = this.page - 1;
        query.sort = this.sortCol + ',' + (this.sortDir ? 'asc' : 'desc');
        this._rest.getList('public/articles', query, false).subscribe(function (re) { return _this.articleList = re; });
    };
    HomeComponent.prototype.sort = function (col) {
        if (this.sortCol === col) {
            this.sortDir = !this.sortDir;
        }
        else {
            this.sortCol = col;
            this.sortDir = true;
        }
        this.load();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
