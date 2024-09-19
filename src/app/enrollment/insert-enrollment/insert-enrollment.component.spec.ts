import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEnrollmentComponent } from './insert-enrollment.component';

describe('InsertEnrollmentComponent', () => {
  let component: InsertEnrollmentComponent;
  let fixture: ComponentFixture<InsertEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertEnrollmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
