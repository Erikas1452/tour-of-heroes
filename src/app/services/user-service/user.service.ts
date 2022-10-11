import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from '../message-service/message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = {
      email: username,
      password: password,
    }
    return this.http
      .post<any>(url, body, this.httpOptions)
      .pipe(
        tap((response) => {
          this.log('fetched user');
        }),
        catchError(this.handleError<any>('getUser'))
      );
  }

  register(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users`;
    const body = {
      email: username,
      password: password,
    };
    return this.http
      .post<any>(url, body, this.httpOptions)
      .pipe(
        tap((response) => {
          this.log('registered user');
        }),
        catchError(this.handleError<any>('registerUser'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      alert(error.error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
