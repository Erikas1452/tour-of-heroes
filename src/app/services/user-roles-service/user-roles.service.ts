import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ErrorHandler } from 'src/app/common/ErrorHandler';
import { Role } from 'src/app/common/role';

@Injectable({
  providedIn: 'root',
})
export class UserRolesService {
  private apiUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private _errorHandler: ErrorHandler) {}

  public updateUserRole(userID: number, newRole: Role, userEmail: string): Observable<any> {
    const url = `${this.apiUrl}/660/users/${userID}`;
    const body = {
      role: newRole,
      /*
      json-server-auth package requiers email and password
      on updates as if its registration so resetting password
      to test on role change
      and keeping the old email
      */
      email: userEmail,
      password: "test",
    };

    return this.http.put<any>(url, body, this.httpOptions).pipe(
      tap((_) => {
        this._errorHandler.log('fetched user');
      }),
      catchError(this._errorHandler.handleError<any>('updateRole', true))
    );
  }
}
