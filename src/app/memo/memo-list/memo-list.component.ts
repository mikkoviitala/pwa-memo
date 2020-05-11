import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticatedGuard} from '../../service/guard/authenticated.guard';
import {Memo} from '../../model/memo.class';
import {MemoService} from '../../service/memo.service';
import {DialogService} from '../../service/dialog.service';
import {SnackbarService} from '../../service/snackbar.service';
import {finalize, tap} from 'rxjs/operators';
import {MediaObserver} from '@angular/flex-layout';
import {LayoutService} from '../../service/layout.service';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss']
})
export class MemoListComponent implements OnInit {
  layout: Observable<string>;
  memos: Observable<Memo[]>;
  selectedMemoId: string;

  constructor(
    public mediaObserver: MediaObserver,
    private layoutService: LayoutService,
    private memoService: MemoService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private guard: AuthenticatedGuard) {
  }

  async ngOnInit() {
    await this.guard.canActivate();
    this.layout = this.layoutService.getLayout();
    this.memos = this.memoService.getMemos()
      .pipe(
        tap(next => next.sort((memo1, memo2) => memo2.date.localeCompare(memo1.date)))
      );
  }

  insertMemo(): void {
    this.dialogService.editMemo(new Memo())
      .subscribe((next) => {
        if (next) {
          this.memoService.insert(next);
          this.snackbarService.show('success.memo-edited');
        }
      }, () => this.snackbarService.show('error.memo-edited'));
  }

  updateMemo(memo: Memo): void {
    const copy = new Memo();
    Object.assign(copy, memo);

    this.dialogService.editMemo(copy)
      .subscribe((next) => {
        if (next) {
          this.memoService.update(next);
          this.snackbarService.show('success.memo-edited');
        }
      }, () => this.snackbarService.show('error.memo-edited'));
  }

  deleteMemo(memo: Memo): void {
    const copy = new Memo();
    Object.assign(copy, memo);

    this.memoService.delete(memo);
    this.snackbarService.show('success.memo-deleted');

    this.snackbarService.showUndo('success.memo-deleted')
      .onAction()
      .subscribe(() => this.memoService.insert(copy));
  }
}
