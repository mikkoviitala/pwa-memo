import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';

@Pipe({
  name: 'localDate',
  pure: false
})
export class LocalDatePipe implements PipeTransform {
  private datePipes: any = {};

  constructor(
    private translateService: TranslateService) {
    environment.languages.forEach(language => this.datePipes[language] = new DatePipe(language));
  }

  transform(value: any): string {
    return this.datePipes[this.translateService.currentLang].transform(value, 'short');
  }
}
