import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {LocalStorageService} from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService) {
    this.translateService.use(localStorageService.language || environment.defaultLanguage);
  }
}
