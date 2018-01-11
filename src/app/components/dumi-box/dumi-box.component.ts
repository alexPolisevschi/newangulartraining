import {Component, OnInit, ViewChild} from '@angular/core';
import {ElementsService, Item} from '../../services/elements.service';
import {Observable} from 'rxjs/Observable';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-dumi-box',
  templateUrl: './dumi-box.component.html',
  styleUrls: ['./dumi-box.component.scss']
})
export class DumiBoxComponent implements OnInit {

  constructor(private _elem: ElementsService) { }

  itemChanges: BehaviorSubject<Item[]>  = new BehaviorSubject<Item[]>([]);

  items: Item[];
  selectedNumber = 0;

  @ViewChild('p') public popover: NgbPopover;

  ngOnInit() {
    this.load();
  }

  load(): void {
    this._elem.getJSON(2000).subscribe(re => this.items = re);
  }

  popForm(event: any): void {
    event.preventDefault();

    this.popover.open();
  }

  getSelectedItems(): Item[] {
    return this.items.filter(i => i.selected);
  }

  onItemChange(id: number, event: any) {
    this.items.find(i => i.id === id).selected = event.target.checked;
    this.itemChanges.next(this.items.filter(i => i.selected));
  }

}
