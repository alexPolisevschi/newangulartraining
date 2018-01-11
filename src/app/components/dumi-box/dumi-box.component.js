"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DumiBoxComponent = /** @class */ (function () {
    function DumiBoxComponent(_elem) {
        this._elem = _elem;
        this.selectedNumber = 0;
    }
    DumiBoxComponent.prototype.ngOnInit = function () {
        this.load();
    };
    DumiBoxComponent.prototype.load = function () {
        this.items = this._elem.getJSON(1000);
    };
    DumiBoxComponent.prototype.popForm = function (event) {
        event.preventDefault();
        this.popover.open();
    };
    __decorate([
        core_1.ViewChild('p')
    ], DumiBoxComponent.prototype, "popover", void 0);
    DumiBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-dumi-box',
            templateUrl: './dumi-box.component.html',
            styleUrls: ['./dumi-box.component.scss']
        })
    ], DumiBoxComponent);
    return DumiBoxComponent;
}());
exports.DumiBoxComponent = DumiBoxComponent;
