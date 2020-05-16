import 'jasmine';
import { LocalDatePipe } from './local-date.pipe';
import {TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';

const mockTranslateService = {
  instant(input) {
    return input;
  }
};

describe('LocalDatePipe', () => {
  let pipe: LocalDatePipe;

  beforeEach((() => {
    TestBed.configureTestingModule({});
    pipe = new LocalDatePipe(mockTranslateService as TranslateService);
  }));

  describe('transform', () => {
    it('should return localized date', () => {
      const result = pipe.transform('2010-07-30T15:05:00.000Z');
      expect(result).toEqual('why these tests are not found?');
    });
  });
});
