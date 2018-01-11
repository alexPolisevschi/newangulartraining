"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ArticleEditorComponent = /** @class */ (function () {
    function ArticleEditorComponent(activeModal, fb, _rest) {
        this.activeModal = activeModal;
        this.fb = fb;
        this._rest = _rest;
    }
    ArticleEditorComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    ArticleEditorComponent.prototype.createForm = function () {
        console.log(this.article);
        this.form = this.fb.group({
            articleType: this.fb.control(this.article.articleType, forms_1.Validators.required),
            publishDate: this.fb.control(this.article.publishDate),
            title: this.fb.control(this.article.title, forms_1.Validators.required),
            text: this.fb.control(this.article.text)
        });
    };
    ArticleEditorComponent.prototype.onSubmit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        if (valid) {
            if (this.article.id) {
                this._rest.update('api/articles/' + this.article.id, value)
                    .subscribe(function (re) {
                    _this.activeModal.close();
                    _this.callback.next(re);
                });
            }
            else {
                this._rest.create('api/articles', value).subscribe(function (re) {
                    _this.activeModal.close();
                    _this.callback.next(re);
                });
            }
        }
    };
    ArticleEditorComponent.prototype.invalid = function (field) {
        var f = this.form.get(field);
        return f.invalid && (f.dirty || f.touched || this.submitted);
    };
    ArticleEditorComponent.prototype.computeModalTitle = function () {
        if (this.article.id === undefined) {
            return 'Add New Article';
        }
        else {
            return 'Editing: ' + this.article.title;
        }
    };
    ArticleEditorComponent.prototype.computeModalSubTitle = function () {
        if (this.article.id === undefined) {
            return '';
        }
        else {
            return 'by ' + this.article.author.name;
        }
    };
    __decorate([
        core_1.Input()
    ], ArticleEditorComponent.prototype, "article", void 0);
    __decorate([
        core_1.Input()
    ], ArticleEditorComponent.prototype, "callback", void 0);
    ArticleEditorComponent = __decorate([
        core_1.Component({
            selector: 'app-article-editor',
            templateUrl: './article-editor.component.html',
            styleUrls: ['./article-editor.component.scss']
        })
    ], ArticleEditorComponent);
    return ArticleEditorComponent;
}());
exports.ArticleEditorComponent = ArticleEditorComponent;
