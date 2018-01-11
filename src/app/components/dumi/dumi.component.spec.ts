import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumiComponent } from './dumi.component';

describe('DumiComponent', () => {
  let component: DumiComponent;
  let fixture: ComponentFixture<DumiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
