import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../../shared/models/student.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insert-student',
  templateUrl: './insert-student.component.html',
  styleUrls: ['./insert-student.component.css'],
})
export class InsertStudentComponent {
  @ViewChild('studentForm') studentForm!: NgForm;
  student: Student = new Student();

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  insertStudent(): void {
    if (this.studentForm.form.valid) {
      this.studentService.saveStudent(this.student).subscribe({
        next: () => {
          this.toastr.success('Aluno cadastrado com sucesso.');
          this.router.navigate(['/students/list']);
        },
        error: (error) => {
          if (error.status === 409) {
            this.toastr.error('Este CPF já está cadastrado.');
          } else {
            this.toastr.error(error.error.message);
          }
        },
      });
    }
  }

  formatEmail(): void {
    if (this.student.email) {
      this.student.email = this.student.email.trim().toLowerCase();
    }
  }

  formatCpfCnpj(): void {
    let value = this.student.cpf;
    if (value) {
      value = value.replace(/\D/g, '');

      if (value.length > 14) {
        value = value.substring(0, 14);
      }

      if (value.length <= 11) {
        // CPF
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      } else {
        // CNPJ
        value = value.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5'
        );
      }

      this.student.cpf = value;
    }
  }
}
