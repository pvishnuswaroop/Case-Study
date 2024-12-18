import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ManageRestaurantsComponent } from './pages/manage-restaurants/manage-restaurants.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { RatingsComponent } from './pages/ratings/ratings.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';

export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
    {path: 'manage-restaurants', component: ManageRestaurantsComponent, canActivate: [AuthGuard]},
    {path: 'manage-users', component:ManageUsersComponent, canActivate: [AuthGuard]},
    {path: 'ratings', component: RatingsComponent, canActivate: [AuthGuard] },
    {path: 'add-admin', component: AddAdminComponent, canActivate: [AuthGuard] },
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];
