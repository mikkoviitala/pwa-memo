import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  selectedLanguage: string;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.selectedLanguage = this.translateService.currentLang;
  }

  toggleLanguage(): void {
    const lang = environment.languages.filter(l => l !== this.selectedLanguage)[0];
    this.selectedLanguage = lang;
    this.translateService.use(lang);
  }
}
