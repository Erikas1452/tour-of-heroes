import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes-page/heroes/heroes.component';
import { DashboardComponent } from './components/heroes-page/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/heroes-page/hero-detail/hero-detail.component';
import { RegisterComponent } from './components/auth-page/register/register.component';
import { LoginComponent } from './components/auth-page/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
    canActivate: [AuthGuard]
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
