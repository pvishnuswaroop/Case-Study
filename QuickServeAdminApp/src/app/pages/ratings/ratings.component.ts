import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { RatingService } from '../../services/rating.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatFormFieldModule, MatLabel, FormsModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonModule, MatListModule],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css'
})
export class RatingsComponent implements OnInit{
  ratings: any[] = [];
  filteredRatings: any[] = [];
  searchTerm: string = '';

  constructor(
    private ratingsService: RatingService,
    private restaurantsService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.loadRatings();
  }

  loadRatings(): void {
    this.ratingsService.getAllRatings().subscribe((ratings: any[]) => {
      // Fetch restaurant names for each rating
      ratings.forEach((rating) => {
        this.restaurantsService.getRestaurantDetails(rating.restaurantID).subscribe((restaurant: any) => {
          rating.restaurantName = restaurant.name;
          this.ratings.push(rating);
          this.filteredRatings = [...this.ratings];
        });
      });
    });
  }

  searchRatings(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredRatings = this.ratings.filter((rating) =>
      rating.restaurantName?.toLowerCase().includes(searchTermLower)
    );
  }
}
