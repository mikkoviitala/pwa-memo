import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly duration: number = 2000;

  constructor(private snackbar: MatSnackBar, private translate: TranslateService) {
  }

  show(message: string, params?: any): void {
    this._open(message, params || null, 'snackbar');
  }

  private _open(message: string, params: any, cssClass: string) {
    const content = params ? this.translate.instant(message, params) : this.translate.instant(message);
    this.snackbar.open(content, null, {
      duration: this.duration,
      panelClass: cssClass
    });
  }
}
