import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ViewOrdersComponent } from '../../components/view-orders/view-orders.component';
import { ViewPaymentsComponent } from '../../components/view-payments/view-payments.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatTableModule, MatButtonModule, MatTableModule, MatTabsModule, MatFormFieldModule, MatLabel, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit{
  searchTerm: string = ''; 
  displayedColumns: string[] = ['name', 'email', 'actions'];
  customers: any[] = [];
  restaurantOwners: any[] = [];
  filteredCustomers: any[] = []; 
  filteredRestaurantOwners: any[] = []; 

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users: any[]) => {
      this.customers = users.filter(user => user.role === 'Customer');
      this.restaurantOwners = users.filter(user => user.role === 'RestaurantOwner');

      this.filteredCustomers = [...this.customers];
      this.filteredRestaurantOwners = [...this.restaurantOwners];
    });
  }

  performSearch(): void {
    console.log('Search triggered:', this.searchTerm);
    const searchTermLower = this.searchTerm.trim().toLowerCase();
    this.filteredCustomers = this.customers.filter(user =>
      user.name.toLowerCase().includes(searchTermLower)
    );
    this.filteredRestaurantOwners = this.restaurantOwners.filter(user =>
      user.name.toLowerCase().includes(searchTermLower)
    );
  
  }



  viewOrders(user: any): void {
    this.dialog.open(ViewOrdersComponent, {
      width: '600px',
      data: { userId: user.userID }
    });
  }

  viewPayments(user: any): void {
    this.dialog.open(ViewPaymentsComponent, {
      width: '600px',
      data: { userId: user.userID }
    });
  }

  deleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.userID).subscribe(() => {
        alert('User deleted successfully');
        this.loadUsers();
      });
    }
  }

  deleteRestaurantOwner(owner: any): void {
    if (confirm(`Are you sure you want to delete ${owner.name}?`)) {
      this.userService.deleteUser(owner.userID).subscribe(() => {
        alert('Restaurant Owner deleted successfully');
        this.loadUsers(); 
      });
    }
  }
  
}
