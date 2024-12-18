import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-view-payments',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatTableModule, MatDialogActions,MatIconModule],
  templateUrl: './view-payments.component.html',
  styleUrl: './view-payments.component.css'
})
export class ViewPaymentsComponent {
  payments: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private userService: UserService,
    private dialogRef: MatDialogRef<ViewPaymentsComponent>
  ) {}

  ngOnInit(): void {
    this.userService.getUserPayments(this.data.userId).subscribe((payments: any[]) => {
      this.payments = payments;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
