import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByTableComponent } from './sale-by-table.component';

describe('SaleByTableComponent', () => {
  let component: SaleByTableComponent;
  let fixture: ComponentFixture<SaleByTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleByTableComponent]
    });
    fixture = TestBed.createComponent(SaleByTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
