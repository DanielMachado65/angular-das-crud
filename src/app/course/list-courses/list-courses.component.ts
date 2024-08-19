import { Component } from '@angular/core';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css',
})
export class ListCoursesComponent {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses = this.courseService.all();
  }

  deleteCourse($event: any, course: Course): void {
    $event.preventDefault();
    if (confirm('Deseja realmente excluir o curso?')) {
      this.courseService.delete(course);
      this.courses = this.courseService.all();
    }
  }
}
