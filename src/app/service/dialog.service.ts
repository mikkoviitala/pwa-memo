import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmDeleteMemoComponent} from '../memo/dialog/confirm-delete-memo/confirm-delete-memo.component';
import {Observable} from 'rxjs';
import {MemoEditorComponent} from '../memo/dialog/memo-editor/memo-editor.component';
import {Memo} from '../model/memo.class';

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
