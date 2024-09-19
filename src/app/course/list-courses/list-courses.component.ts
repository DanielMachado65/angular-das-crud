import { Component, OnInit } from '@angular/core';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css',
})
export class ListCoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.listCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteCourse($event: any, course: Course): void {
    $event.preventDefault();
    if (confirm('Deseja realmente excluir o curso?')) {
      this.courseService.deleteCourse(course).subscribe({
        next: () => {
          this.courseService.listCourses().subscribe({
            next: (courses) => {
              this.courses = courses;
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
