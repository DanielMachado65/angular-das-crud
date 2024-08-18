import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCourseComponent } from './insert-course.component';

describe('InsertCourseComponent', () => {
  let component: InsertCourseComponent;
  let fixture: ComponentFixture<InsertCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
