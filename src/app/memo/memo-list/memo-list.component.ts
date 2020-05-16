import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticatedGuard} from '../../core/guards/authenticated.guard';
import {DialogService} from '../../core/services/dialog.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {first, map, take} from 'rxjs/operators';
import {MediaObserver} from '@angular/flex-layout';
import {fadeInOut} from '../../core/animations/fade-in-out';
import {LayoutService} from '../../core/services/layout.service';
import {MemoService} from '../../core/services/memo.service';
import {Memo} from '../../core/models/memo.class';


@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss'],
  animations: [fadeInOut]
})
export class MemoListComponent implements OnInit {
  layout: Observable<string>;
  memos: Observable<Memo[]>;
  selectedMemoId: string;
  noMemos: boolean;

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
    this.layout = this.layoutService.currentLayout();
    this.memos = this.memoService.getMemos()
      .pipe(
        map(next => {
          if (next) {
            next.sort((memo1, memo2) => memo2.date.localeCompare(memo1.date));
            return next;
          }
          this.noMemos = next && next.length === 0;
        })
      );
  }

  insertMemo(): void {
    this.dialogService.editMemo(new Memo())
      .pipe(first())
      .subscribe((next) => {
        if (next) {
          this.memoService.insertMemo(next);
          this.snackbarService.show('success.memo-edited');
        }
      }, () => this.snackbarService.show('error.memo-edited'));
  }

  updateMemo(memo: Memo): void {
    const copy: Memo = new Memo(memo);

    this.dialogService.editMemo(copy)
      .pipe(first())
      .subscribe((next) => {
        if (next) {
          this.memoService.updateMemo(next);
          this.snackbarService.show('success.memo-edited');
        }
      }, () => this.snackbarService.show('error.memo-edited'));
  }

  deleteMemo(memo: Memo): void {
    const copy: Memo = new Memo(memo);

    this.memoService.deleteMemo(memo);
    this.snackbarService.showUndo('success.memo-deleted')
      .onAction()
      .pipe(take(1))
      .subscribe(() => this.memoService.insertMemo(copy));
  }
}
