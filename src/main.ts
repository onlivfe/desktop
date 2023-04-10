import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ROUTES from './app/routes';


if (window.location.hostname === 'tauri.localhost') {
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    return false;
  }, { capture: true })

  document.addEventListener('selectstart', e => {
    e.preventDefault();
    return false;
  }, { capture: true })
}

import '@angular/localize/init';
import { loadLocaleData } from './locale.loader';

loadLocaleData().then((currentLocale) => {
  bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, BrowserAnimationsModule), provideRouter(ROUTES), {
      provide: LOCALE_ID,
      useValue: currentLocale,
    }]
  })
    .catch(err => console.error(err));

})

