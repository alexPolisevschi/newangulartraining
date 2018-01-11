import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthToken} from '../domain/auth.token';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';


@Injectable()
export class AuthService implements CanActivate, CanLoad {

  public authenticated: BehaviorSubject<boolean> = new BehaviorSubject(this._cookie.check('auth'));

  constructor(
    private _http: HttpClient, private _cookie: CookieService, private _router: Router) {
  }


  public login(username: string, password: string): Observable<string> {
    const params: string = 'username=' + username + '&password=' + password + '&grant_type=password';
    const headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(environment.oauthClientId + ':' + environment.oauthClientSecret));
    return this._http.post<AuthToken>(environment.rootPath + environment.oauthTokenPath, params.toString(), { headers: headers })
      .map(re => {
        this.setAuth(re);
        this.authenticated.next(true);
        return re.access_token;
      }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json()['error'] || 'Login error');
  }


  public logout(): void {
    this._cookie.delete('auth');
    this._cookie.delete('refresh');
    this.authenticated.next(false);
    this._router.navigate(['/']);
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.checkCredentials().map(token => {
      return token != null;
    });
  }

  public canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return this.checkCredentials().map(token => {
      return token != null;
    });
  }

  public checkCredentials(): Observable<string> {
    if (this.getAuth()) {
      return Observable.of(this.getAuth());
    } else {
      if (this.getRefresh()) {
        return this.refreshAccessToken();
      } else {
        return Observable.of(null);
      }
    }
  }

  private refreshAccessToken(): Observable<string> {
    if (!this.getRefresh()) {
      return;
    }
    const params: string = 'refresh_token=' + this.getRefresh() + '&grant_type=refresh_token';
    const headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(environment.oauthClientId + ':' + environment.oauthClientSecret));
    return this._http.post<AuthToken>(environment.rootPath + environment.oauthTokenPath, params, { headers: headers })
      .map(re => {
        this.setAuth(re);
        this.authenticated.next(true);
        return re.access_token;
      });
  }


  private getAuth(): string {
    return this._cookie.get('auth');
  }

  private getRefresh(): string {
    return this._cookie.get('refresh');
  }

  private setAuth(a: AuthToken): void {
    this._cookie.set('auth', a.access_token, new Date(new Date().getTime() + a.expires_in * 1000));
    this._cookie.set('refresh', a.refresh_token);
  }

}
