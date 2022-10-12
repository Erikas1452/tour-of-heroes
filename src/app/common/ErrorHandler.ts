import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
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

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      this._snackBarHandler.openSnackBar(error.error);
      return EMPTY;
    };
  }

  public log(message: string) {
    this._messageService.add(`Service: ${message}`);
  }
}
