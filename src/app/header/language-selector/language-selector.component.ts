import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from '../../service/local-storage.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  selectedLanguage: string;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.selectedLanguage = this.translateService.currentLang;
  }

  toggleLanguage(): void {
    const language = environment.languages.filter(l => l !== this.selectedLanguage)[0];
    this.selectedLanguage = language;
    this.translateService.use(language);
    this.localStorageService.setLanguage(language);
  }
}
