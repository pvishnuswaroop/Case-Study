import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatTableModule, MatDialogActions, MatIconModule],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {
  orders: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private userService: UserService,
    private dialogRef: MatDialogRef<ViewOrdersComponent>
  ) {}

  ngOnInit(): void {
    this.userService.getUserOrders(this.data.userId).subscribe((orders: any[]) => {
      this.orders = orders;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
