import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenServiceComponent } from './open-service.component';

describe('OpenServiceComponent', () => {
  let component: OpenServiceComponent;
  let fixture: ComponentFixture<OpenServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenServiceComponent]
    });
    fixture = TestBed.createComponent(OpenServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
