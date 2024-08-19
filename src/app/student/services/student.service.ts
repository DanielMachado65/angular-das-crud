import { Injectable } from '@angular/core';
import { Student } from '../../shared/models/student.model';

const LS_STUDENTS = 'STUDENTS';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor() {}

  all(): Student[] {
    const students = localStorage.getItem(LS_STUDENTS);
    return students ? JSON.parse(students) : [];
  }

  get(id: number): Student | undefined {
    const students = this.all();
    return students.find((s) => s.id === id);
  }

  save(student: Student): void {
    const students = this.all();
    student.id = new Date().getTime();
    students.push(student);
    localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
  }

  delete(student: Student): void {
    const students = this.all();
    const index = students.findIndex((s) => s.id === student.id);
    students.splice(index, 1);
    localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
  }

  update(student: Student): void {
    const students = this.all();
    const index = students.findIndex((s) => s.id === student.id);
    students[index] = student;
    localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
  }
}
