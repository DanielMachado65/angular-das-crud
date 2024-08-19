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
      const res = this.studentService.get(id);
      if (res !== undefined) this.student = res;
      else throw new Error('Estudante não encontrada: ' + id);
    } else {
      this.router.navigate(['/students/list']);
    }
  }

  updateStudent(): void {
    if (this.studentForm.form.valid) {
      this.studentService.update(this.student);
      this.router.navigate(['/students/list']);
    }
  }
}
