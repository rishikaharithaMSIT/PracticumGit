import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmStockComponent } from './addm-stock.component';

describe('AddmStockComponent', () => {
  let component: AddmStockComponent;
  let fixture: ComponentFixture<AddmStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
