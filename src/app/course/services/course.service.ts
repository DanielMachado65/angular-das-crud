import { Injectable } from '@angular/core';
import { Course } from '../../shared/models/course.model';
import { BaseService } from '../../shared/services/base.service';
import { catchError, map, Observable, of } from 'rxjs';

const LS_COURSES = 'COURSES';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseService {
  listCourses(): Observable<Course[]> {
    return this.get<Course[]>('/courses').pipe(
      map((courses) => {
        return courses ? courses : [];
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  getCourse(id: number): Observable<Course | null> {
    return this.get<Course>('/courses/' + id).pipe(
      map((course) => {
        return course ? course : null;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  saveCourse(course: Course): Observable<Course | null> {
    return this.post<Course>('/courses', course).pipe(
      map((course) => {
        return course;
      }),
      catchError(() => {
        return of(course);
      })
    );
  }

  deleteCourse(course: Course): Observable<Course | null> {
    return this.delete<Course>('/courses/' + course.id).pipe(
      map((course) => {
        return course;
      }),
      catchError(() => {
        return of(course);
      })
    );
  }

  updateCourse(course: Course): Observable<Course | null> {
    return this.put<Course>('/courses/' + course.id, course).pipe(
      map((course) => {
        return course;
      }),
      catchError(() => {
        return of(course);
      })
    );
  }
}
