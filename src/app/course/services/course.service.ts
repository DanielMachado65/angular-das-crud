import { Injectable } from '@angular/core';
import { Course } from '../../shared/models/course.model';

const LS_COURSES = 'COURSES';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor() {}

  all(): Course[] {
    const courses = localStorage.getItem(LS_COURSES);
    return courses ? JSON.parse(courses) : [];
  }

  get(id: number): Course | undefined {
    const courses = this.all();
    return courses.find((c) => c.id === id);
  }

  save(course: Course): void {
    const courses = this.all();
    courses.push(course);
    localStorage.setItem(LS_COURSES, JSON.stringify(courses));
  }

  delete(course: Course): void {
    const courses = this.all();
    const index = courses.findIndex((c) => c.id === course.id);
    courses.splice(index, 1);
    localStorage.setItem(LS_COURSES, JSON.stringify(courses));
  }

  update(course: Course): void {
    const courses = this.all();
    const index = courses.findIndex((c) => c.id === course.id);
    courses[index] = course;
    localStorage.setItem(LS_COURSES, JSON.stringify(courses));
  }
}
