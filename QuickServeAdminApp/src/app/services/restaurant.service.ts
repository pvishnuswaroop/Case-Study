import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'https://localhost:7009';

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/admin/dashboard/restaurants`);
  }

  toggleRestaurantStatus(restaurantId: number, payload: { isActive: boolean }): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/admin/dashboard/restaurant/status/${restaurantId}`, payload);
  }

  deleteRestaurant(restaurantId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/admin/dashboard/restaurant/${restaurantId}`);
  }

  addRestaurant(restaurant: any) {
    return this.http.post(`${this.baseUrl}/api/Restaurant`, restaurant);
  }

  registerUser(user: any) {
    return this.http.post(`${this.baseUrl}/api/User/register`, user);
  }

  updateRestaurant(id: number, restaurant: any) {
    return this.http.put(`${this.baseUrl}/api/Restaurant/${id}`, restaurant);
  }

  getRestaurantDetails(id: number) {
    return this.http.get<any>(`${this.baseUrl}/api/Restaurant/${id}`);
  }
  
  getMenuByRestaurant(restaurantId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/api/Menu/restaurant/${restaurantId}`);
  }
  
  
}
