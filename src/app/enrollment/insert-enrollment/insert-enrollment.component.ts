import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Enrollment } from '../../shared/models/enrollment.model';
import { EnrollmentService } from '../services/enrollment.service';
import { Student } from '../../shared/models/student.model';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../../course/services/course.service';
import { StudentService } from '../../student/services/student.service';
import { Find } from '../../shared/utils/find.utils';

@Component({
  selector: 'app-insert-enrollment',
  templateUrl: './insert-enrollment.component.html',
  styleUrl: './insert-enrollment.component.css',
})
export class InsertEnrollmentComponent implements OnInit {
  @ViewChild('enrollmentForm') enrollmentForm!: NgForm;
  enrollment: Enrollment = new Enrollment();
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loadStudents();
    this.loadCourses();
  }

  private loadStudents(): void {
    this.studentService.listStudents().subscribe({
      next: (data: Student[]) => (this.students = data),
      error: (error) => console.error('Erro ao carregar estudantes:', error),
    });
  }

  private loadCourses(): void {
    this.courseService.listCourses().subscribe({
      next: (data: Course[]) => (this.courses = data),
      error: (error) => console.error('Erro ao carregar cursos:', error),
    });
  }

  private assignEnrollmentData(): void {
    const selectedCourse = Find.findById(this.courses, this.enrollment.course);
    const selectedStudent = Find.findById(
      this.students,
      this.enrollment.student
    );

    if (selectedCourse) {
      this.enrollment.course = selectedCourse;
    }

    if (selectedStudent) {
      this.enrollment.student = selectedStudent;
    }
  }

  insertEnrollment(): void {
    if (this.enrollmentForm.form.valid) {
      this.assignEnrollmentData();

      this.enrollmentService.saveEnrollment(this.enrollment).subscribe({
        next: () => this.router.navigate(['/enrollments/list']),
        error: (error) => console.error('Erro ao salvar matrícula:', error),
      });
    }
  }
}
