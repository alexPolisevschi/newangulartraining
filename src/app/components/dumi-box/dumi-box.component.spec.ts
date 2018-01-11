import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumiBoxComponent } from './dumi-box.component';

describe('DumiBoxComponent', () => {
  let component: DumiBoxComponent;
  let fixture: ComponentFixture<DumiBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumiBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumiBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
