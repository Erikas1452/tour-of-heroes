import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes-page/heroes/heroes.component';
import { DashboardComponent } from './components/heroes-page/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/heroes-page/hero-detail/hero-detail.component';
import { RegisterComponent } from './components/auth-page/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLoginComponent } from './components/admin-page/admin-login/admin-login.component';
import { UserLoginComponent } from './components/auth-page/user-login/user-login/user-login.component';
import { AdminDashboardComponent } from './components/admin-page/admin-dashboard/admin-dashboard.component';
import { Role } from './common/role';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Role.Admin]
    }
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Role.User, Role.Visitor]
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Role.User, Role.Visitor]
    }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Role.User, Role.Visitor]
    }
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
