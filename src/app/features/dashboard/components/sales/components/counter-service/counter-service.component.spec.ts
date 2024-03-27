import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterServiceComponent } from './counter-service.component';

describe('CounterServiceComponent', () => {
  let component: CounterServiceComponent;
  let fixture: ComponentFixture<CounterServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterServiceComponent]
    });
    fixture = TestBed.createComponent(CounterServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
