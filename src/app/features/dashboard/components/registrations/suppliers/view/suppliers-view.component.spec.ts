import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersViewComponent } from './suppliers-view.component';

describe('SuppliersViewComponent', () => {
  let component: SuppliersViewComponent;
  let fixture: ComponentFixture<SuppliersViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersViewComponent]
    });
    fixture = TestBed.createComponent(SuppliersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
