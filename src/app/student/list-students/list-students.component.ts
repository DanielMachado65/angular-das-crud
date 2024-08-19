import { Component, OnInit } from '@angular/core';
import { Student } from '../../shared/models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.css',
})
export class ListStudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.students = this.studentService.all();
  }

  deleteStudent($event: any, student: Student): void {
    $event.preventDefault();
    if (confirm('Deseja realmente excluir o aluno?')) {
      this.studentService.delete(student);
      this.students = this.studentService.all();
    }
  }
}
