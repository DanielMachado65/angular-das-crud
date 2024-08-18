import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './services/course.service';
import { InsertCourseComponent } from './insert-course/insert-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';

@NgModule({
  declarations: [InsertCourseComponent, UpdateCourseComponent, ListCoursesComponent],
  imports: [CommonModule],
  providers: [CourseService],
})
export class CourseModule {}
