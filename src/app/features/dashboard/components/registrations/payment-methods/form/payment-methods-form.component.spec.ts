import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsFormComponent } from './payment-methods-form.component';

describe('PaymentMethodsFormComponent', () => {
  let component: PaymentMethodsFormComponent;
  let fixture: ComponentFixture<PaymentMethodsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodsFormComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
