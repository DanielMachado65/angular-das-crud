import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

export interface ChartDataItem {
  name: string;
  value: number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  data: ChartDataItem[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (metrics) => {
        this.data = metrics;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
