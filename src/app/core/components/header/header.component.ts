import {Component, OnDestroy, OnInit} from '@angular/core';
import {OnlineService} from '../../services/online.service';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private _setTooltip(): void {
    this.tooltip = '';
    /*this.tooltip = !this.isOnline ?
      this.translate.instant('toolbar.offline', { count: 10 }) :
      '';*/
  }
}
