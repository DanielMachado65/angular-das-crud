import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insert-course',
  templateUrl: './insert-course.component.html',
  styleUrl: './insert-course.component.css',
})
export class InsertCourseComponent {
  @ViewChild('courseForm') courseForm!: NgForm;
  course: Course = new Course();

  constructor(
    private courseService: CourseService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  insertCourse(): void {
    if (this.courseForm.form.valid) {
      this.courseService.saveCourse(this.course).subscribe({
        next: () => {
          this.toastr.success('Curso cadastrado com sucesso.');
          this.router.navigate(['/courses/list']);
        },
        error: (error) => {
          if (error.status === 409) {
            this.toastr.error('Este nome já está cadastrado.');
          } else {
            this.toastr.error(error.error.message);
          }
        },
      });
    }
  }
}
