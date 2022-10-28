import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Role } from '../common/role';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public _auth: AuthService, public _router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const routeUrl: string = state.url;
    const authenticated: boolean = this._auth.isAuthenticated();
    const userRole: Role | undefined = this._auth.getUserRole();

    const userRoutes: string[] = ['/login', '/register', '/dashboard', '/heroes', '/detail'];
    const adminRoutes: string[] = ['/admin', '/admin/dashboard'];

    //User is not authenticated and trying to access login and register routes
    if (
      !authenticated &&
      (routeUrl === '/login' ||
        routeUrl === '/register' ||
        routeUrl === '/admin')
    ) {
      return true;
    }

    //User is not authenticated and trying to access admin routes
    if (!authenticated && routeUrl == '/admin/dashboard') {
      this._router.navigate(['/admin']);
      return false;
    }

    //User is not authenticated and trying to acess any other route
    if (!authenticated) {
      this._router.navigate(['login']);
      return false;
    }

    //if user is Authenticated and its role is not admin
    if (userRole !== Role.Admin) {
      //trying to access admin route
      if (authenticated && adminRoutes.includes(routeUrl)) {
        this._router.navigate(['dashboard']);
        return false;
      }
      //User is authenticated and trying to use login and register routes
      if (
        authenticated &&
        (routeUrl === '/login' || routeUrl === '/register')
      ) {
        this._router.navigate(['dashboard']);
        return false;
      }
      return true;
    }

    if (userRole === Role.Admin) {
      if (authenticated && userRoutes.includes(routeUrl)) {
        this._router.navigate(['admin/dashboard']);
        return false;
      }
      if (authenticated && routeUrl === '/admin') {
        this._router.navigate(['admin/dashboard']);
        return false;
      }
      return true;
    }

    return true;
  }
}
