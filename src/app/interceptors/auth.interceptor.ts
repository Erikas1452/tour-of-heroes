import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeroService } from '../services/hero-service/hero.service';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public heroService: HeroService, private authService: AuthService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
