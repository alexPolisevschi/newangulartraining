import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ArticleListComponent} from './components/article-list/article-list.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {AuthService} from './services/auth.service';


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot([
        {
          path: 'users',
          component: UserListComponent,
          canActivate: [AuthService],
          canLoad: [AuthService]
        },
        {
          path: 'articles',
          component: ArticleListComponent,
          canActivate: [AuthService],
          canLoad: [AuthService]
        },
        {
          path: '',
          component: HomeComponent
        },
        {
          path: '**',
          component: NotFoundComponent
        }
      ],
      {enableTracing: false}
      )
  ]
})
export class AppRoutingModule { }
