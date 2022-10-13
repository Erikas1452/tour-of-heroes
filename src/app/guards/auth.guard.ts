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
  private routeURL!: string;

  constructor(public _auth: AuthService, public _router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {


    //User is not authenticated and trying to use login and register routes
    if (!this._auth.isAuthenticated() && (state.url === '/login' || state.url === '/register')) {
      return true;
    }

    //User is not authenticated and trying to acess any other route
    if(!this._auth.isAuthenticated()){
      this._router.navigate(['login']);
      return false;
    }
    
    //User is authenticated and trying to use login and register routes
    if (this._auth.isAuthenticated() && (state.url === '/login' || state.url === '/register'))
    {
      this._router.navigate(['dashboard']);
    }
    return true;
  }
}
