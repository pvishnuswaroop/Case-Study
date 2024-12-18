import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7009/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/User/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  
  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1]; // Extract payload
      const decodedPayload = atob(payload); // Decode base64
      return JSON.parse(decodedPayload); // Parse JSON
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  
  }

  
  getUserId(): number | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? parseInt(decodedToken.sub) : null;
  }

  getRoleFromToken(): string {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return '';
  }
  
  // getRoleFromToken(token: string): string {
  //   const decoded: any = jwtDecode(token);
  //   return decoded?.Role || '';
  // }
}
