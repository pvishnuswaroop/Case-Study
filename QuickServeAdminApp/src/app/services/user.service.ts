import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:7009/api';
  constructor(private http: HttpClient) { }

  getUserOrders(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Order/user/${userId}`);
  }
  
  getUserPayments(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Payment/user/${userId}/all`);
  }
  
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/dashboard/users`);
  }
  
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/dashboard/User/${userId}`);
  }
}
