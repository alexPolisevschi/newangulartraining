"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home/home.component");
var article_list_component_1 = require("./components/article-list/article-list.component");
var not_found_component_1 = require("./components/not-found/not-found.component");
var user_list_component_1 = require("./components/user-list/user-list.component");
var auth_service_1 = require("./services/auth.service");
var dumi_component_1 = require("./components/dumi/dumi.component");
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            exports: [
                router_1.RouterModule
            ],
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: 'users',
                        component: user_list_component_1.UserListComponent,
                        canActivate: [auth_service_1.AuthService],
                        canLoad: [auth_service_1.AuthService]
                    },
                    {
                        path: 'articles',
                        component: article_list_component_1.ArticleListComponent,
                        canActivate: [auth_service_1.AuthService],
                        canLoad: [auth_service_1.AuthService]
                    },
                    {
                        path: '',
                        component: home_component_1.HomeComponent
                    },
                    {
                        path: 'dumi',
                        component: dumi_component_1.DumiComponent
                    },
                    {
                        path: '**',
                        component: not_found_component_1.NotFoundComponent
                    }
                ], { enableTracing: false })
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
