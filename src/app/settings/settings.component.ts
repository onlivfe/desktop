import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LOCALES, changeLocale } from '../../locale.loader';
import { MatOptionModule } from '@angular/material/core';
import { AccountListComponent } from './accounts-list/account-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    AccountListComponent,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  protected readonly localeTranslations: Record<
    (typeof LOCALES)[number],
    string
  > = {
    en: $localize`:Localization option@@lang-en:English option in language picker`,
    fi: $localize`:Localization option@@lang-fi:Finnish option in language picker`,
  };

  protected locales: [string, string][] = Object.entries(
    this.localeTranslations
  );

  constructor(
    @Inject(LOCALE_ID) protected currentLocale: (typeof LOCALES)[number]
  ) {}

  protected switchLocale(ev: MatSelectChange) {
    const lang = ev.value as (typeof LOCALES)[number];
    changeLocale(lang);
  }
}
