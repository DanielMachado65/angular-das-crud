import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course/services/course.service';
import { StudentService } from '../../student/services/student.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  constructor(
    private studentsService: StudentService,
    private coursesService: CourseService
  ) {}

  ngOnInit(): void {
    this.studentsService.all();
    this.coursesService.all();
  }
}
