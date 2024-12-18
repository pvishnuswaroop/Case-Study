import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'https://localhost:7009/api/admin/dashboard';

  constructor(private http: HttpClient) {}

  getReports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports`);
  }
}
