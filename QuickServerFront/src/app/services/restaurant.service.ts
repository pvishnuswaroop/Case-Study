import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from './restaurant.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private apiUrl = 'https://localhost:7009/api/Restaurant';

  constructor(private http: HttpClient) {}

  
  fetchRestaurants(): Observable<Restaurant[]> {
    console.log('Fetching restaurants...');
    return this.http.get<Restaurant[]>(this.apiUrl).pipe(
      map((restaurants) =>
        restaurants.map((restaurant) => ({
          ...restaurant,
          isActive: restaurant.isActive ? 'Online' : 'Offline',
        }))
      )
    );
  }

  getRestaurantById(restaurantId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${restaurantId}`);
  }


  searchRestaurantsByItem(itemName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search-by-item?itemName=${itemName}`);
  }

  getTrendingRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/getTrendingRestaurants`);
  }
}
