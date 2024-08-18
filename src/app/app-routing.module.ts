import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentsComponent } from './student/list-students/list-students.component';
import { InsertStudentComponent } from './student/insert-student/insert-student.component';
import { UpdateStudentComponent } from './student/update-student/update-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'students/list', pathMatch: 'full' },
  // students
  { path: 'students', redirectTo: 'students/list' },
  { path: 'students/list', component: ListStudentsComponent },
  { path: 'students/new', component: InsertStudentComponent },
  { path: 'students/update/:id', component: UpdateStudentComponent },
  // courses
  { path: 'courses', redirectTo: 'courses/list' },
  { path: 'courses/list', component: ListStudentsComponent },
  { path: 'courses/new', component: InsertStudentComponent },
  { path: 'courses/update/:id', component: UpdateStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
