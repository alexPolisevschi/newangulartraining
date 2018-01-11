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
var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());
exports.Item = Item;
var ElementsService = /** @class */ (function () {
    function ElementsService() {
    }
    ElementsService.prototype.getJSON = function (n) {
        var list = [];
        for (var i = 0; i < n; i++) {
            var itemList = new Item();
            itemList.id = i;
            itemList.description = 'Description of item' + i;
            list.push(itemList);
        }
        return Observable_1.Observable.of(list);
    };
    ElementsService = __decorate([
        core_1.Injectable()
    ], ElementsService);
    return ElementsService;
}());
exports.ElementsService = ElementsService;
