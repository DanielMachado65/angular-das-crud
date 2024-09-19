import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from './services/enrollment.service';
import { ListEnrollmentComponent } from './list-enrollment/list-enrollment.component';
import { InsertEnrollmentComponent } from './insert-enrollment/insert-enrollment.component';
import { UpdateEnrollmentComponent } from './update-enrollment/update-enrollment.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListEnrollmentComponent,
    InsertEnrollmentComponent,
    UpdateEnrollmentComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
