"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/login/login.component");
var home_component_1 = require("./components/home/home.component");
var article_list_component_1 = require("./components/article-list/article-list.component");
var user_list_component_1 = require("./components/user-list/user-list.component");
var user_editor_component_1 = require("./components/user-editor/user-editor.component");
var article_editor_component_1 = require("./components/article-editor/article-editor.component");
var not_found_component_1 = require("./components/not-found/not-found.component");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var auth_service_1 = require("./services/auth.service");
var rest_service_1 = require("./services/rest.service");
var dumi_component_1 = require("./components/dumi/dumi.component");
var dumi_box_component_1 = require("./components/dumi-box/dumi-box.component");
var elements_service_1 = require("./services/elements.service");
var dumi_box_form_component_1 = require("./components/dumi-box-form/dumi-box-form.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                article_list_component_1.ArticleListComponent,
                user_list_component_1.UserListComponent,
                not_found_component_1.NotFoundComponent,
                user_editor_component_1.UserEditorComponent,
                article_editor_component_1.ArticleEditorComponent,
                dumi_component_1.DumiComponent,
                dumi_box_component_1.DumiBoxComponent,
                dumi_box_form_component_1.DumiBoxFormComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            providers: [
                ngx_cookie_service_1.CookieService,
                auth_service_1.AuthService,
                rest_service_1.RestService,
                elements_service_1.ElementsService
            ],
            entryComponents: [
                user_editor_component_1.UserEditorComponent,
                article_editor_component_1.ArticleEditorComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
