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

  checkUserLogin(route: ActivatedRouteSnapshot, url: string): boolean {

    const loginRoutes: string[] = ['/login', '/register', '/admin'];

    const authenticated: boolean = this._auth.isAuthenticated();
    let userRole: Role | undefined = this._auth.getUserRole();
    
    if(!loginRoutes.includes(url))
    {
      return this.userRoleMatcherRouteRole(route, userRole);
    }
  
    if (!authenticated) {
      return true;
    }

    userRole === Role.Admin
      ? this._router.navigate(['/admin/dashboard'])
      : this._router.navigate(['/dashboard']);

    return false;

  }

  private userRoleMatcherRouteRole(route: ActivatedRouteSnapshot, userRole: Role | undefined){
    
    if (route.data['role'].includes(userRole)) {
      return true;
    }
    
    this._router.navigate(['/login']);
    return false;

  }

  public canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {

    const routeUrl: string = state.url;

    return this.checkUserLogin(route, routeUrl);

  }
}
