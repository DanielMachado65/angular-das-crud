import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css',
})
export class UpdateCourseComponent implements OnInit {
  @ViewChild('courseForm') courseForm!: NgForm;
  course: Course = new Course();

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      let id = +this.route.snapshot.params['id'];
      this.courseService.getCourse(id).subscribe({
        next: (course) => {
          if (course) this.course = course;
          else throw new Error('Curso não encontrado: ' + id);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.router.navigate(['/courses/list']);
    }
  }

  updateCourse(): void {
    if (this.courseForm.form.valid) {
      this.courseService.updateCourse(this.course).subscribe({
        next: () => {
          this.router.navigate(['/courses/list']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
