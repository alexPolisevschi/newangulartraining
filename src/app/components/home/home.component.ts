import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Article} from '../../domain/article';
import {Resource} from '../../domain/resource';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _rest: RestService) { }

  articleList: Resource<Article>;
  page = 0;
  searchTerm = '';
  sortCol = 'publishDate';
  sortDir = false;

  ngOnInit() {
    this.load();
  }

  private load() {
    const query: { [k: string]: any } = {};
    query.size = environment.pageSize;
    query.search = this.searchTerm;
    query.page = this.page - 1;
    query.sort = this.sortCol + ',' + (this.sortDir ? 'asc' : 'desc');
    this._rest.getList<Article>('public/articles', query, false).subscribe(re => this.articleList = re);
  }

  sort(col: string): void {
    if (this.sortCol === col) {
      this.sortDir = !this.sortDir;
    } else {
      this.sortCol = col;
      this.sortDir = true;
    }
    this.load();
  }

}
