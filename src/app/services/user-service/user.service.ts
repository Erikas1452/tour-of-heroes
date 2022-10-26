import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ErrorHandler } from 'src/app/common/ErrorHandler';
import { Role } from 'src/app/common/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private _errorHandler: ErrorHandler,
  ) {}

  public getUsers() {
    const url = `${this.apiUrl}/users`;
    return this.http.get(url,this.httpOptions).pipe(
      tap((response) => {
        console.log(response);
        this._errorHandler.log('fetched users');
      }),
      catchError(this._errorHandler.handleError<any>('getUsers', true, []))
    )
  }

  public login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = {
      email: username,
      password: password,
    }
    return this.http
      .post<any>(url, body, this.httpOptions)
      .pipe(
        tap((_) => {
          this._errorHandler.log('fetched user');
        }),
        catchError(this._errorHandler.handleError<any>('getUser', true))
      );
  }

  public register(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users`;
    const body = {
      email: username,
      password: password,
      role: Role.Visitor
    };
    return this.http
      .post<any>(url, body, this.httpOptions)
      .pipe(
        tap((_) => {
          this._errorHandler.log('registered user');
        }),
        catchError(this._errorHandler.handleError<any>('registerUser', true))
      );
  }

  
}
