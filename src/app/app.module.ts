import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ArticleListComponent} from './components/article-list/article-list.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './services/auth.service';
import {RestService} from './services/rest.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArticleListComponent,
    UserListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    CookieService,
    AuthService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
