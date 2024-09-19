import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Enrollment } from '../../shared/models/enrollment.model';
import { EnrollmentService } from '../services/enrollment.service';
import { Student } from '../../shared/models/student.model';
import { Course } from '../../shared/models/course.model';
import { CourseService } from '../../course/services/course.service';
import { StudentService } from '../../student/services/student.service';
import { Find } from '../../shared/utils/find.utils';

@Component({
  selector: 'app-update-enrollment',
  templateUrl: './update-enrollment.component.html',
  styleUrls: ['./update-enrollment.component.css'],
})
export class UpdateEnrollmentComponent implements OnInit {
  @ViewChild('enrollmentForm') enrollmentForm!: NgForm;
  enrollment: Enrollment = new Enrollment();
  students: Student[] = [];
  courses: Course[] = [];
  enrollmentId: number | undefined;
  studentId: number | undefined;
  courseId: number | undefined;
  loadingStudents: boolean = true;
  loadingCourses: boolean = true;
  loadingButton: boolean = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.enrollmentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.enrollmentId) {
      this.loadData();
      this.loadEnrollment();
    } else this.router.navigate(['/enrollments/list']);
  }

  private loadData(): void {
    this.loadStudents();
    this.loadCourses();
  }

  private loadEnrollment(): void {
    if (this.enrollmentId) {
      this.enrollmentService.getEnrollment(this.enrollmentId).subscribe({
        next: (data: Enrollment | null) => {
          if (data) {
            this.enrollment = data;
            this.studentId = data.student?.id;
            this.courseId = data.course?.id;
          }
        },
        error: (error) => console.error('Erro ao carregar matrícula:', error),
      });
    }
  }

  private loadStudents(): void {
    this.studentService.listStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Erro ao carregar estudantes:', error);
      },
      complete: () => (this.loadingStudents = false),
    });
  }

  private loadCourses(): void {
    this.courseService.listCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Erro ao carregar cursos:', error);
      },
      complete: () => (this.loadingCourses = false),
    });
  }

  private assignEnrollmentData(): void {
    const selectedStudent = Find.findById(this.students, this.studentId);
    const selectedCourse = Find.findById(this.courses, this.courseId);

    if (selectedStudent) {
      this.enrollment.student = selectedStudent;
    }

    if (selectedCourse) {
      this.enrollment.course = selectedCourse;
    }
  }

  updateEnrollment(): void {
    this.loadingButton = true;
    if (this.enrollmentForm.form.valid) {
      this.assignEnrollmentData();

      this.enrollmentService.updateEnrollment(this.enrollment).subscribe({
        next: () => this.router.navigate(['/enrollments/list']),
        error: (error) => console.error('Erro ao atualizar matrícula:', error),
        complete: () => (this.loadingButton = false),
      });
    }
  }
}
