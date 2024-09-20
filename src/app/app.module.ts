import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { HomeModule } from './home/home.module';
import { BaseService } from './shared/services/base.service';
import { provideHttpClient } from '@angular/common/http';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentModule,
    CourseModule,
    EnrollmentModule,
    HomeModule,
    BrowserAnimationsModule,
    NgxChartsModule,
  ],
  providers: [BaseService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
