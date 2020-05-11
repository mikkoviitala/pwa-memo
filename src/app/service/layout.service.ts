import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private layouts: string[] = ['grid', 'row'];
  private readonly layout: BehaviorSubject<string>;

  constructor(private localStorageService: LocalStorageService) {
    this.layout = new BehaviorSubject<string>(this.localStorageService.getLayout());
  }

  getLayout(): Observable<string> {
    return this.layout.asObservable();
  }

  toggleLayout(): void {
    const current = this.localStorageService.getLayout();
    const next = current === this.layouts[0] ? this.layouts[1] : this.layouts[0];
    this.localStorageService.setLayout(next);
    this.layout.next(next);
  }
}
