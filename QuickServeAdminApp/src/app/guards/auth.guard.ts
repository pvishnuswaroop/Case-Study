// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
      const Role = this.authService.getRoleFromToken();
      if (Role == 'Admin') {
        return true;
      }
    
    alert('Unauthorized: Login as Admin to access this page');
    this.router.navigate(['/']);
    return false;
  }
}

