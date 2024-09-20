import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  public getDashboard(): Observable<any> {
    return this.get<any>('/dashboard');
  }
}
