import {Component, OnDestroy, OnInit} from '@angular/core';
import {OnlineService} from '../../services/online.service';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {MemoQueueService} from '../../services/memo-queue.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  pendingChanges: number;
  tooltip: string;
  isOnline: boolean;

  constructor(
    private translate: TranslateService,
    private memoQueueService: MemoQueueService,
    private onlineService: OnlineService) {
    this.isOnline = true;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.translate.onLangChange.subscribe(() => this._setTooltip()));

    this.subscriptions.push(
      this.onlineService.onlineStateChanged.subscribe(next => {
        this.isOnline = next;
        this._setTooltip();
      }));

    this.subscriptions.push(
      this.memoQueueService.count.subscribe(count => {
        this.pendingChanges = count;
        this._setTooltip();
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private _setTooltip(): void {
    this.tooltip = !this.isOnline ?
      this.translate.instant('toolbar.offline', {count: this.pendingChanges}) :
      '';
  }
}
