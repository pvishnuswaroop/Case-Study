import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-restaurant-modal.component.html',
  styleUrl: './add-restaurant-modal.component.css'
})
export class AddRestaurantModalComponent {
  addRestaurantForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService
  ) {
    this.addRestaurantForm = this.fb.group({
      restaurantName: ['', Validators.required],
      location: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      ownerName: ['', Validators.required],
      ownerEmail: ['', [Validators.required, Validators.email]],
      ownerPassword: ['', Validators.required],
      ownerContact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }


  submitForm() {
    if (this.addRestaurantForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const formValues = this.addRestaurantForm.value;

    const restaurantPayload = {
      name: formValues.restaurantName,
      location: formValues.location,
      phoneNumber: formValues.phoneNumber,
      isActive: true,
    };

    const userPayload = {
      name: formValues.ownerName,
      email: formValues.ownerEmail,
      password: formValues.ownerPassword,
      role: 'RestaurantOwner',
      contactNumber: formValues.ownerContact,
    };
    this.restaurantService.addRestaurant(restaurantPayload).subscribe({
      next: () => {
        this.restaurantService.registerUser(userPayload).subscribe({
          next: () => {
            alert('Restaurant and owner added successfully!');
            this.addRestaurantForm.reset();
            this.isSubmitting = false;
          },
          error: () => {
            alert('Failed to add the restaurant owner.');
            this.isSubmitting = false;
          },
        });
      },
      error: () => {
        alert('Failed to add the restaurant.');
        this.isSubmitting = false;
      },
    });
  }
}
