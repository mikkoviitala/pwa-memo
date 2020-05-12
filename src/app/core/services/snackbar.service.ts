import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarRef} from '@angular/material/snack-bar/typings/snack-bar-ref';
import {SimpleSnackBar} from '@angular/material/snack-bar/typings/simple-snack-bar';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly duration: number = 1800;
  private readonly undoDuration: number = 3000;

  constructor(
    private snackbar: MatSnackBar,
    private localStorage: LocalStorageService,
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
    this.translate.use(this.localStorage.getLanguage());
    return this._open(
      message,
      params || null,
      this.translate.instant('common.undo'),
      this.undoDuration);
  }

  private _open(message: string, params: any, action: string, duration: number): MatSnackBarRef<SimpleSnackBar> {
    const content = params ? this.translate.instant(message, params) : this.translate.instant(message);

    return this.snackbar.open(
      content,
      action, {
        duration,
        panelClass: 'snackbar' /* ['mat-toolbar', 'mat-primary'] */
      });
  }
}
