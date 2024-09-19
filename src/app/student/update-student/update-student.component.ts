import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../../shared/models/student.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css',
})
export class UpdateStudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild('studentForm') studentForm!: NgForm;
  student: Student = new Student();

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      let id = +this.route.snapshot.params['id'];
      this.studentService.getStudent(id).subscribe({
        next: (student) => {
          if (student) this.student = student;
          else throw new Error('Estudante não encontrada: ' + id);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.router.navigate(['/students/list']);
    }
  }

  updateStudent(): void {
    if (this.studentForm.form.valid) {
      this.studentService.update(this.student).subscribe({
        next: () => {
          this.router.navigate(['/students/list']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
