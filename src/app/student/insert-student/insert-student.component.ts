import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../../shared/models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-student',
  templateUrl: './insert-student.component.html',
  styleUrls: ['./insert-student.component.css'],
})
export class InsertStudentComponent {
  @ViewChild('studentForm') studentForm!: NgForm;
  student: Student = new Student();

  constructor(private studentService: StudentService, private router: Router) {}

  insertStudent(): void {
    if (this.studentForm.form.valid) {
      this.studentService.save(this.student);
      this.router.navigate(['/students/list']);
    }
  }

  formatEmail(): void {
    if (this.student.email) {
      this.student.email = this.student.email.trim().toLowerCase();
    }
  }
}