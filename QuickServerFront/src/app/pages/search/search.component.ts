import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuModalComponent } from '../../components/menu-modal/menu-modal.component';
import { MenuService } from '../../services/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchTerm: string = '';
  restaurants: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['q'];
      this.searchRestaurants(this.searchTerm);
    });
  }

  searchRestaurants(term: string) {
    this.restaurantService.searchRestaurantsByItem(term).subscribe({
      next: (data) => {
        this.restaurants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching search results:', err);
        this.isLoading = false;
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
}
