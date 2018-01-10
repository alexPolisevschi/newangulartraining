import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Resource} from '../../domain/resource';
import {User} from '../../domain/user';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private _rest: RestService) { }

  userList: Resource<User>;
  page = 0;
  searchTerm = '';
  sortCol = 'name';
  sortDir = true;
  selectedId: number;


  ngOnInit() {
    this.load();
  }

  private load() {
    const query: { [k: string]: any } = {};
    query.size = environment.pageSize;
    query.search = this.searchTerm;
    query.page = this.page - 1;
    query.sort = this.sortCol + ',' + (this.sortDir ? 'asc' : 'desc');
    this._rest.getList<User>('api/user', query).subscribe(re => this.userList = re);
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

  deleteSelected(): void {
    this._rest.delete('api/user/' + this.selectedId).subscribe(re => this.load());
  }

  deleteById(id: number): void {
    this._rest.delete('api/user/' + id).subscribe(re => this.load());
  }

}
