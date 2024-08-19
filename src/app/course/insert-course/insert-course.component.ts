import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-insert-course',
  templateUrl: './insert-course.component.html',
  styleUrl: './insert-course.component.css',
})
export class InsertCourseComponent {
  @ViewChild('courseForm') courseForm!: NgForm;
  course: Course = new Course();

  constructor(private courseService: CourseService, private router: Router) {}

  insertCourse(): void {
    if (this.courseForm.form.valid) {
      this.courseService.save(this.course);
      this.router.navigate(['/courses/list']);
    }
  }
}
