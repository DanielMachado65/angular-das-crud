import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Enrollment } from '../../shared/models/enrollment.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService extends BaseService {
  listEnrollments(): Observable<Enrollment[]> {
    return this.get<Enrollment[]>('/enrollments').pipe(
      map((enrollments) => {
        return enrollments ? enrollments : [];
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  getEnrollment(id: number): Observable<Enrollment | null> {
    return this.get<Enrollment>('/enrollments/' + id).pipe(
      map((enrollment) => {
        return enrollment ? enrollment : null;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  saveEnrollment(enrollment: Enrollment): Observable<Enrollment | null> {
    return this.post<Enrollment>('/enrollments', enrollment).pipe(
      map((enrollment) => {
        return enrollment;
      }),
      catchError(() => {
        return of(enrollment);
      })
    );
  }

  deleteEnrollment(enrollment: Enrollment): Observable<Enrollment | null> {
    return this.delete<Enrollment>('/enrollments/' + enrollment.id).pipe(
      map((enrollment) => {
        return enrollment;
      }),
      catchError(() => {
        return of(enrollment);
      })
    );
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment | null> {
    return this.put<Enrollment>(
      '/enrollments/' + enrollment.id,
      enrollment
    ).pipe(
      map((enrollment) => {
        return enrollment;
      }),
      catchError(() => {
        return of(enrollment);
      })
    );
  }
}
