import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for buttons

@Component({
  selector: 'app-view-restaurant-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule], // Include necessary imports
  templateUrl: './view-restaurant-details.component.html',
  styleUrls: ['./view-restaurant-details.component.css'] // Fix the 'styleUrl' to 'styleUrls'
})
export class ViewRestaurantDetailsComponent {
  restaurantDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { restaurantId: number },
    private restaurantService: RestaurantService,
    private dialogRef: MatDialogRef<ViewRestaurantDetailsComponent>
  ) {}

  ngOnInit() {
    this.restaurantService.getRestaurantDetails(this.data.restaurantId).subscribe({
      next: (details) => {
        this.restaurantDetails = details;
      },
      error: () => {
        alert('Failed to fetch restaurant details.');
        this.dialogRef.close();
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
