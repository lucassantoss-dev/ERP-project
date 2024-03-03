import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadComponent } from './data-upload.component';

describe('DataUploadComponent', () => {
  let component: DataUploadComponent;
  let fixture: ComponentFixture<DataUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataUploadComponent]
    });
    fixture = TestBed.createComponent(DataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
