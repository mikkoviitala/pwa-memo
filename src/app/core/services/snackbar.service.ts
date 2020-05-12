import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarRef} from '@angular/material/snack-bar/typings/snack-bar-ref';
import {SimpleSnackBar} from '@angular/material/snack-bar/typings/simple-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly duration: number = 1800;
  private readonly undoDuration: number = 3000;

  constructor(
    private snackbar: MatSnackBar,
    private translate: TranslateService) {
  }

  show(message: string, params?: any): void {
    this._open(
      message,
      params || null,
      null,
      this.duration);
  }

  showUndo(message: string, params?: any): MatSnackBarRef<SimpleSnackBar> {
    return this._open(
      message,
      params || null,
      'common.undo',
      this.undoDuration);
  }

  private _open(message: string, params: any, action: string, duration: number): MatSnackBarRef<SimpleSnackBar> {
    const content = params ? this.translate.instant(message, params) : this.translate.instant(message);
    const buttonText = action ? this.translate.instant(action) : null;

    return this.snackbar.open(
      content,
      buttonText, {
        duration,
        panelClass: 'snackbar' /* ['mat-toolbar', 'mat-primary'] */
      });
  }
}
