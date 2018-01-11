import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {RestService} from '../../services/rest.service';
import {Resource} from '../../domain/resource';
import {Article} from '../../domain/article';
import {ArticleEditorComponent} from '../article-editor/article-editor.component';

import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(private _rest: RestService, private _modalSv: NgbModal) { }

  changes: BehaviorSubject<Article> = new BehaviorSubject<Article>(null);

  articleList: Resource<Article>;
  page = 0;
  searchTerm = '';
  sortCol = 'title';
  sortDir = true;
  selectedId: number;
  hoverId: number;

  ngOnInit() {
    this.load();

    this.changes.subscribe(u => {
      if (u !== null) {
        this.load();
      }
    });
  }


  private load() {
    const query: { [k: string]: any } = {};
    query.size = environment.pageSize;
    query.search = this.searchTerm;
    query.page = this.page - 1;
    query.sort = this.sortCol + ',' + (this.sortDir ? 'asc' : 'desc');
    this._rest.getList<Article>('api/articles', query).subscribe(re => this.articleList = re);
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


  deleteById(id: number): void {
    this._rest.delete('api/articles/' + id).subscribe(re => this.load());
  }

  edit(article: Article): void {
    const modalRef = this._modalSv.open(ArticleEditorComponent);
    modalRef.componentInstance.article = article;
    modalRef.componentInstance.callback = this.changes;
  }

  createNew(): void {
    const article: Article = new Article();
    this.edit(article);
  }

}
