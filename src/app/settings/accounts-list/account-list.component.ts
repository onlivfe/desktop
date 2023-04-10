import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { AccountAuth, AccountsAuthService } from '../../accounts-auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatTooltipModule, MatIconModule, MatDividerModule, MatMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListComponent {
  constructor(protected accountsAuthService: AccountsAuthService) { }

  protected logout(account: AccountAuth) {

  }
}
