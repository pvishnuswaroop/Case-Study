import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RestaurantService } from '../../services/restaurant.service';
import { AddRestaurantModalComponent } from '../../components/add-restaurant-modal/add-restaurant-modal.component';
import { UpdateRestaurantModalComponent } from '../../components/update-restaurant-modal/update-restaurant-modal.component';
import { ViewRestaurantDetailsComponent } from '../../components/view-restaurant-details/view-restaurant-details.component';
import { ViewMenuComponent } from '../../components/view-menu/view-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-manage-restaurants',
  standalone: true, 
  imports: [MatTableModule, MatButtonModule, MatInputModule, MatDialogModule, FormsModule, CommonModule, MatIconModule, MatMenuModule],
  templateUrl: './manage-restaurants.component.html',
  styleUrl: './manage-restaurants.component.css'
})
export class ManageRestaurantsComponent {
  displayedColumns: string[] = ['name', 'location', 'actions'];
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchTerm: string = '';

  constructor(private restaurantService: RestaurantService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      this.filteredRestaurants = data;
    });
  }

  search() {
    this.filteredRestaurants = this.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddRestaurantModal() {
    const dialogRef = this.dialog.open(AddRestaurantModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRestaurants(); 
      }
    });
  }

  updateRestaurant(restaurant: any) {
    const dialogRef = this.dialog.open(UpdateRestaurantModalComponent, {
      data: { restaurant },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRestaurants(); 
      }
    });
  }

  toggleRestaurantStatus(restaurant: any) {
    const newStatus = !restaurant.isActive; // Toggle status
  const statusAction = newStatus ? 'activate' : 'deactivate';

  if (confirm(`Are you sure you want to ${statusAction} this restaurant?`)) {
    this.restaurantService.toggleRestaurantStatus(restaurant.restaurantID, { isActive: newStatus }).subscribe({
      next: () => {
        alert(`Restaurant ${statusAction}d successfully!`);
        this.loadRestaurants(); // Reload the restaurant list
      },
      error: () => {
        alert(`Failed to ${statusAction} the restaurant.`);
      },
    });
  }
  }

  confirmDeleteRestaurant(restaurant: any) {
    if (confirm(`Are you sure you want to delete ${restaurant.name}?`)) {
      if (confirm(`This action is irreversible. Do you still want to proceed?`)) {
        this.restaurantService.deleteRestaurant(restaurant.restaurantID).subscribe({
          next: () => {
            alert(`Restaurant ${restaurant.name} deleted successfully!`);
            this.loadRestaurants(); // Reload the list after deletion
          },
          error: () => {
            alert(`Failed to delete the restaurant.`);
          },
        });
      }
    }
  }

  viewRestaurantDetails(restaurant: any) {
    this.dialog.open(ViewRestaurantDetailsComponent, {
      data: { restaurantId: restaurant.restaurantID },
      width: '400px',
    });
  }
  
  viewMenu(restaurant: any) {
    this.dialog.open(ViewMenuComponent, {
      data: { restaurantId: restaurant.restaurantID },
      width: '600px',
    });
  }
}
