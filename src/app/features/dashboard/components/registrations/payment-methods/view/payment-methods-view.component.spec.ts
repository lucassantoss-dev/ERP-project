import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsViewComponent } from './payment-methods-view.component';

describe('PaymentMethodsViewComponent', () => {
  let component: PaymentMethodsViewComponent;
  let fixture: ComponentFixture<PaymentMethodsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodsViewComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
