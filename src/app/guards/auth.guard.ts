import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public _auth: AuthService, public _router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : boolean {
    const routeUrl: string = state.url;
    const authenticated: boolean = this._auth.isAuthenticated();

    //User is not authenticated and trying to use login and register routes
    if (!authenticated && (routeUrl === '/login' || routeUrl === '/register')) {
      return true;
    }

    //User is not authenticated and trying to acess any other route
    if (!authenticated) {
      this._router.navigate(['login']);
      return false;
    }

    //User is authenticated and trying to use login and register routes
    if (authenticated && (routeUrl === '/login' || routeUrl === '/register')) {
      this._router.navigate(['dashboard']);
    }
    return true;
  }
}
