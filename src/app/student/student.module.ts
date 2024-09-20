import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from './services/student.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListStudentsComponent } from './list-students/list-students.component';
import { InsertStudentComponent } from './insert-student/insert-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DateValidatorDirective } from '../shared/directives/date-validator.directive';

@NgModule({
  declarations: [
    ListStudentsComponent,
    InsertStudentComponent,
    UpdateStudentComponent,
    DateValidatorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskPipe,
    NgxMaskDirective,
  ],
  providers: [StudentService, provideNgxMask()],
})
export class StudentModule {}
