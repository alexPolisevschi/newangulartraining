"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var article_1 = require("../../domain/article");
var article_editor_component_1 = require("../article-editor/article-editor.component");
var environment_1 = require("../../../environments/environment");
var ArticleListComponent = /** @class */ (function () {
    function ArticleListComponent(_rest, _modalSv) {
        this._rest = _rest;
        this._modalSv = _modalSv;
        this.changes = new BehaviorSubject_1.BehaviorSubject(null);
        this.page = 0;
        this.searchTerm = '';
        this.sortCol = 'title';
        this.sortDir = true;
    }
    ArticleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load();
        this.changes.subscribe(function (u) {
            if (u !== null) {
                _this.load();
            }
        });
    };
    ArticleListComponent.prototype.load = function () {
        var _this = this;
        var query = {};
        query.size = environment_1.environment.pageSize;
        query.search = this.searchTerm;
        query.page = this.page - 1;
        query.sort = this.sortCol + ',' + (this.sortDir ? 'asc' : 'desc');
        this._rest.getList('api/articles', query).subscribe(function (re) { return _this.articleList = re; });
    };
    ArticleListComponent.prototype.sort = function (col) {
        if (this.sortCol === col) {
            this.sortDir = !this.sortDir;
        }
        else {
            this.sortCol = col;
            this.sortDir = true;
        }
        this.load();
    };
    ArticleListComponent.prototype.deleteById = function (id) {
        var _this = this;
        this._rest.delete('api/articles/' + id).subscribe(function (re) { return _this.load(); });
    };
    ArticleListComponent.prototype.edit = function (article) {
        var modalRef = this._modalSv.open(article_editor_component_1.ArticleEditorComponent);
        modalRef.componentInstance.article = article;
        modalRef.componentInstance.callback = this.changes;
    };
    ArticleListComponent.prototype.createNew = function () {
        var article = new article_1.Article();
        this.edit(article);
    };
    ArticleListComponent = __decorate([
        core_1.Component({
            selector: 'app-article-list',
            templateUrl: './article-list.component.html',
            styleUrls: ['./article-list.component.scss']
        })
    ], ArticleListComponent);
    return ArticleListComponent;
}());
exports.ArticleListComponent = ArticleListComponent;
