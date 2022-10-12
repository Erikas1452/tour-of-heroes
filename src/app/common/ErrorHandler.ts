import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../services/message-service/message.service';
import { SnackbarHandler } from './SnackBarHandler';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandler {
  constructor(
    private _messageService: MessageService,
    private _snackBarHandler: SnackbarHandler
  ) {}

  public handleError<T>(operation = 'operation', showError: boolean, result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      if(showError)
      {
        this._snackBarHandler.openSnackBar(error.error);
      }
      return of(result as T);
    };
  }

  public log(message: string) {
    this._messageService.add(`Service: ${message}`);
  }
}
