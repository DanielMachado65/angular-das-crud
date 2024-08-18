import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from './services/student.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListStudentsComponent } from './list-students/list-students.component';
import { InsertStudentComponent } from './insert-student/insert-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';

@NgModule({
  declarations: [
    ListStudentsComponent,
    InsertStudentComponent,
    UpdateStudentComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [StudentService],
})
export class StudentModule {}
