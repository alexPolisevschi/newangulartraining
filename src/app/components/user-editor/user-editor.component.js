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
var UserEditorComponent = /** @class */ (function () {
    function UserEditorComponent(activeModal, fb, rest) {
        this.activeModal = activeModal;
        this.fb = fb;
        this.rest = rest;
    }
    UserEditorComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    UserEditorComponent.prototype.createForm = function () {
        console.log(this.user);
        this.form = this.fb.group({
            name: this.fb.control(this.user.name, forms_1.Validators.required),
            username: this.fb.control(this.user.username, forms_1.Validators.required),
            status: this.fb.control(this.user.status),
            role: this.fb.control(this.user.role)
        });
    };
    UserEditorComponent.prototype.onSubmit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        if (valid) {
            if (this.user.id) {
                this.rest.update('api/user/' + this.user.id, value)
                    .subscribe(function (re) {
                    _this.activeModal.close();
                    _this.callback.next(re);
                });
            }
            else {
                this.rest.create('api/user', value).subscribe(function (re) {
                    _this.activeModal.close();
                    _this.callback.next(re);
                });
            }
        }
    };
    UserEditorComponent.prototype.invalid = function (field) {
        var f = this.form.get(field);
        return f.invalid && (f.dirty || f.touched || this.submitted);
    };
    __decorate([
        core_1.Input()
    ], UserEditorComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input()
    ], UserEditorComponent.prototype, "callback", void 0);
    UserEditorComponent = __decorate([
        core_1.Component({
            selector: 'app-user-editor',
            templateUrl: './user-editor.component.html',
            styleUrls: ['./user-editor.component.scss']
        })
    ], UserEditorComponent);
    return UserEditorComponent;
}());
exports.UserEditorComponent = UserEditorComponent;
