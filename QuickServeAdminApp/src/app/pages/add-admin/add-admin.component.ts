import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RestaurantService } from '../../services/restaurant.service';
import { NgIf } from '@angular/common';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgIf,],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar
  ) {
    this.adminForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['Admin']
    });
  }

  onSubmit() {
    if (this.adminForm.invalid) {
      this.snackBar.open('Please fill all the required fields correctly.', 'Close', { duration: 3000 });
      return;
    }

    const adminData = this.adminForm.value;
    this.restaurantService.registerUser(adminData).subscribe(
      (response) => {
        this.snackBar.open('Admin registered successfully!', 'Close', { duration: 3000 });
        this.adminForm.reset();
      },
      (error) => {
        if (error.status === 409) {
          // Conflict (User already exists)
          this.snackBar.open('User already exists. Please try with a different email.', 'Close', { duration: 3000 });
        } else if (error.status === 400) {
          // Generic bad request error
          this.snackBar.open(error.error.message || 'Failed to register. Please try again.', 'Close', { duration: 3000 });
        } else {
          // Other errors
          this.snackBar.open('An unexpected error occurred. Please try again.', 'Close', { duration: 3000 });
        }
      }
    );
  }
}
