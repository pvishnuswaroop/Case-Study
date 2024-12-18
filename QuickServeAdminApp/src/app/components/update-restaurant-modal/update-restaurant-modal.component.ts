import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-restaurant-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-restaurant-modal.component.html',
  styleUrl: './update-restaurant-modal.component.css'
})
export class UpdateRestaurantModalComponent {
  updateRestaurantForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateRestaurantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restaurantService: RestaurantService
  ) {
    this.updateRestaurantForm = this.fb.group({
      name: [data.restaurant.name, Validators.required],
      location: [data.restaurant.location, Validators.required],
      phoneNumber: [
        data.restaurant.phoneNumber,
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      isActive: [data.restaurant.isActive],
    });
  }

  submitForm() {
    if (this.updateRestaurantForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const updatedRestaurant = {
      ...this.data.restaurant,
      ...this.updateRestaurantForm.value,
      updatedAt: new Date().toISOString(),
    };

    this.restaurantService.updateRestaurant(this.data.restaurant.restaurantID, updatedRestaurant).subscribe({
      next: () => {
        alert('Restaurant updated successfully!');
        this.dialogRef.close(true);
      },
      error: () => {
        alert('Failed to update the restaurant.');
        this.isSubmitting = false;
      },
    });
  }
  close() {
    this.dialogRef.close(false);
  }
}
