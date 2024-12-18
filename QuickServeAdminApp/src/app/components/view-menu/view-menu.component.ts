import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.css'
})
export class ViewMenuComponent {
  menuItems: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { restaurantId: number },
    private restaurantService: RestaurantService,
    private dialogRef: MatDialogRef<ViewMenuComponent>
  ) {}

  ngOnInit() {
    this.restaurantService.getMenuByRestaurant(this.data.restaurantId).subscribe({
      next: (menuItems) => {
        this.menuItems = menuItems;
      },
      error: () => {
        alert('Failed to fetch menu.');
        this.dialogRef.close();
      },
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
