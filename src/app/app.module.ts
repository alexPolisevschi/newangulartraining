import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ArticleListComponent} from './components/article-list/article-list.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserEditorComponent} from './components/user-editor/user-editor.component';
import {ArticleEditorComponent} from './components/article-editor/article-editor.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './services/auth.service';
import {RestService} from './services/rest.service';
import {DumiComponent} from './components/dumi/dumi.component';
import {DumiBoxComponent} from './components/dumi-box/dumi-box.component';
import {ElementsService} from './services/elements.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArticleListComponent,
    UserListComponent,
    NotFoundComponent,
    UserEditorComponent,
    ArticleEditorComponent,
    DumiComponent,
    DumiBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    CookieService,
    AuthService,
    RestService,
    ElementsService
  ],
  entryComponents: [
    UserEditorComponent,
    ArticleEditorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
