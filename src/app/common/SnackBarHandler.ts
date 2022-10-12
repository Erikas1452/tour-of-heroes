import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarHandler {
  constructor(
    private _snackBar: MatSnackBar,
    private readonly _ngZone: NgZone
  ) {}

  public openSnackBar(message: string): void {
    this._ngZone.run(() => {
      this._snackBar.open(message, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
