import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../enrollment/services/enrollment.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrollmentService.listEnrollments().subscribe({
      next: (enrollments) => {
        console.log(enrollments);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
