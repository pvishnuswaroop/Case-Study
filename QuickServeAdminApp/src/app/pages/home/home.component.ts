import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  reports: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.adminService.getReports().subscribe({
      next: (data) => (this.reports = data),
      error: (err) => console.error('Error fetching reports:', err),
    });
  }
}
