import { TestBed } from '@angular/core/testing';
import { changeLocale, loadLocaleData } from './locale.loader';

describe('Locale loader', () => {
  beforeEach(async () => {
    import('@angular/localize/init');
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  });

  it('should be able to load & store locales', async () => {
    changeLocale('fi', false);
    let locale = await loadLocaleData();
    expect(locale).toEqual('fi');
    changeLocale('en', false);
    locale = await loadLocaleData();
    expect(locale).toEqual('en');
  });
});
