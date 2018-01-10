import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Resource} from '../../domain/resource';
import {User} from '../../domain/user';

import {UserEditorComponent} from '../user-editor/user-editor.component';
import {RestService} from '../../services/rest.service';

import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private _rest: RestService, private _modalSv: NgbModal) { }

  changes: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  userList: Resource<User>;
  page = 0;
  searchTerm = '';
  sortCol = 'name';
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

  edit(u: User): void {
    const modalRef = this._modalSv.open(UserEditorComponent);
    modalRef.componentInstance.user = u;
    modalRef.componentInstance.callback = this.changes;
  }

  createNew(): void {
    const u: User = new User();
    this.edit(u);
  }

}
