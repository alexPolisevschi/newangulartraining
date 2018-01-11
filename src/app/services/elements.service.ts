import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class Item {
  id: number;
  description: string;
}

@Injectable()
export class ElementsService {

  constructor() { }

  public getJSON(n: number): Observable<Item[]> {
    const list: Item[] = [];
    for (let i = 0; i < n; i++) {
      const itemList = new Item();
      itemList.id = i;
      itemList.description = 'Description of item' + i;
      list.push(itemList);
    }
    return Observable.of(list);
  }
}
