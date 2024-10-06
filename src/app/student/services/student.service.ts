import { Injectable } from '@angular/core';
import { Student } from '../../shared/models/student.model';
import { BaseService } from '../../shared/services/base.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends BaseService {
  listStudents(): Observable<Student[]> {
    return this.get<Student[]>('/students').pipe(
      map((students) => {
        return students ? students : [];
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  getStudent(id: number): Observable<Student | null> {
    return this.get<Student>('/students/' + id).pipe(
      map((student) => {
        return student ? student : null;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  saveStudent(student: Student): Observable<Student | null> {
    return this.post<Student>('/students', student).pipe(
      map((student) => {
        return student;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  deleteStudent(student: Student): Observable<Student | null> {
    return this.delete<Student>('/students/' + student.id).pipe(
      map((student) => {
        return student;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  updateStudent(student: Student): Observable<Student | null> {
    return this.put<Student>('/students/' + student.id, student).pipe(
      map((student) => {
        return student;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
