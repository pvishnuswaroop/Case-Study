import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MenuModalComponent } from '../../components/menu-modal/menu-modal.component';
import { MenuService } from '../../services/menu.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  searchTerm: string = '';
  trendingRestaurants: any[] = [];
  isLoadingTrending = true;

  constructor(
    private router: Router, 
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchTrendingRestaurants();
  }

  fetchTrendingRestaurants() {
    this.restaurantService.getTrendingRestaurants().subscribe({
      next: (data) => {
        this.trendingRestaurants = data;
        this.isLoadingTrending = false;
      },
      error: (err) => {
        console.error('Error fetching trending restaurants:', err);
        this.isLoadingTrending = false;
      },
    });
  }

  viewMenu(restaurantId: number) {
    this.menuService.getSortedMenu(restaurantId).subscribe({
          next: (menu) => {
            this.dialog.open(MenuModalComponent, {
              data: { menu },
              width: '600px',
            });
          },
          error: (err) => {
            console.error('Error fetching menu:', err);
          },
        });
  }

  searchItems() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  onCategoryClick(itemName: string) {
    this.router.navigate(['/search'], { queryParams: { q: itemName } });
  }
}
