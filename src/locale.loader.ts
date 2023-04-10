import { registerLocaleData } from '@angular/common';
import { clearTranslations, loadTranslations } from '@angular/localize';

export const LOCALES = Object.freeze(<const>["en", "fi"]);

export const loadLocaleData = async (): Promise<typeof LOCALES[number]> => {
  let locale = localStorage.getItem("locale");
  if (locale === null || !LOCALES.includes(locale as typeof LOCALES[number])) {
    locale = LOCALES[0];
  }

  const currentLocale = locale as typeof LOCALES[number];

  try {
    const resp = await fetch(`./assets/locale/messages.${currentLocale}.json`);
    if (!resp.ok) {
      throw new Error(`${resp.status} (${resp.url})`);
    }
    const data = await resp.json();
    clearTranslations();
    switch (currentLocale) {
      case 'en':
        registerLocaleData(import('@angular/common/locales/en'), 'en');
        break;
      case 'fi':
        registerLocaleData(import('@angular/common/locales/fi'), 'fi');
        break;
    }

    loadTranslations(data.translations);

    return currentLocale;
  } catch (err) {
    throw new Error(`Failed to fetch locale ${currentLocale}: ${err}`)
  }
}

/**
  * Changes the locale, note that this will cause a page reload by default
  * @param locale The locale to change to
  * @param reload if to reload the window
  */
export const changeLocale = (locale: typeof LOCALES[number], reload = true): void => {
  localStorage.setItem("locale", locale);
  if (reload) window.location.reload();
}
