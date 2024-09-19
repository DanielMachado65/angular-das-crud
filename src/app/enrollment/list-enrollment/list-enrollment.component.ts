import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../services/enrollment.service';
import { Enrollment } from '../../shared/models/enrollment.model';

@Component({
  selector: 'app-list-enrollment',
  templateUrl: './list-enrollment.component.html',
  styleUrl: './list-enrollment.component.css',
})
export class ListEnrollmentComponent implements OnInit {
  enrollments: Enrollment[] = [];
  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrollmentService.listEnrollments().subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteEnrollment($event: any, enrollment: Enrollment): void {
    $event.preventDefault();
    if (confirm('Deseja realmente excluir o aluno?')) {
      this.enrollmentService.deleteEnrollment(enrollment).subscribe({
        next: () => {
          this.enrollmentService.listEnrollments().subscribe({
            next: (enrollments) => {
              this.enrollments = enrollments;
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
