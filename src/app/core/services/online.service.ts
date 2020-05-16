import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  private stateChanged = new BehaviorSubject<boolean>(!!window.navigator.onLine);

  constructor() {
    window.addEventListener('online', () => this._updateOnlineState());
    window.addEventListener('offline', () => this._updateOnlineState());
  }

  get isOnline() {
    return !!window.navigator.onLine;
  }

  get onlineStateChanged() {
    return this.stateChanged.asObservable();
  }

  private _updateOnlineState() {
    this.stateChanged.next(window.navigator.onLine);
  }
}
