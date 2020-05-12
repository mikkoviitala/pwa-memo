import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {MemoEditorComponent} from '../../memo/memo-editor/memo-editor.component';
import {Memo} from '../models/memo.class';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  editMemo(memo: Memo): Observable<any> {
    return this._open(MemoEditorComponent, {
      disableClose: true,
      width: '310px',
      data: {
        memo
      }
    });
  }

  private _open(component: any, config: any): Observable<any> {
    return this.dialog.open(component, config).afterClosed();
  }
}
