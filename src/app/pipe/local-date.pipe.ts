import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'localDate',
  pure: false
})
export class LocalDatePipe implements PipeTransform {

  constructor(
    private translateService: TranslateService) {
  }

  transform(value: any): string {
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(value.replace(/:[^:]*$/, ''), 'short');
  }
}
