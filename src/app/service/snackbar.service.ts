import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarRef} from '@angular/material/snack-bar/typings/snack-bar-ref';
import {SimpleSnackBar} from '@angular/material/snack-bar/typings/simple-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly showDuration: number = 1800;
  private readonly showUndoDuration: number = 3000;

  constructor(private snackbar: MatSnackBar, private translate: TranslateService) {
  }

  show(message: string, params?: any): void {
    this._open(message, null, params || null, this.showDuration);
  }

  showUndo(message: string, params?: any): MatSnackBarRef<SimpleSnackBar> {
    return this._open(message, 'Undo', params || null, this.showUndoDuration);
  }

  private _open(message: string, action: string, params: any, duration: number): MatSnackBarRef<SimpleSnackBar> {
    const content = params ? this.translate.instant(message, params) : this.translate.instant(message);
    return this.snackbar.open(content, action, {
      duration,
      panelClass: 'snackbar' /* ['mat-toolbar', 'mat-primary'] */
    });
  }
}
