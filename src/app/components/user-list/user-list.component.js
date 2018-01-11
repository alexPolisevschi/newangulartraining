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
var user_1 = require("../../domain/user");
var user_editor_component_1 = require("../user-editor/user-editor.component");
var environment_1 = require("../../../environments/environment");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(_rest, _modalSv) {
        this._rest = _rest;
        this._modalSv = _modalSv;
        this.changes = new BehaviorSubject_1.BehaviorSubject(null);
        this.page = 0;
        this.searchTerm = '';
        this.sortCol = 'fullName';
        this.sortDir = true;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load();
        this.changes.subscribe(function (u) {
            if (u !== null) {
                _this.load();
            }
        });
    };
    UserListComponent.prototype.load = function () {
        var _this = this;
        var query = {};
        query.size = environment_1.environment.pageSize;
        query.search = this.searchTerm;
        query.page = this.page - 1;
        query.sort = this.sortCol + ',' + (this.sortDir ? 'asc' : 'desc');
        this._rest.getList('api/user', query).subscribe(function (re) { return _this.userList = re; });
    };
    UserListComponent.prototype.sort = function (col) {
        if (this.sortCol === col) {
            this.sortDir = !this.sortDir;
        }
        else {
            this.sortCol = col;
            this.sortDir = true;
        }
        this.load();
    };
    UserListComponent.prototype.deleteSelected = function () {
        var _this = this;
        this._rest.delete('api/user/' + this.selectedId).subscribe(function (re) { return _this.load(); });
    };
    UserListComponent.prototype.deleteById = function (id) {
        var _this = this;
        this._rest.delete('api/user/' + id).subscribe(function (re) { return _this.load(); });
    };
    UserListComponent.prototype.edit = function (u) {
        var modalRef = this._modalSv.open(user_editor_component_1.UserEditorComponent);
        modalRef.componentInstance.user = u;
        modalRef.componentInstance.callback = this.changes;
    };
    UserListComponent.prototype.createNew = function () {
        var u = new user_1.User();
        this.edit(u);
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'app-user-list',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.scss']
        })
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
