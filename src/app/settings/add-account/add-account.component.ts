import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AccountsAuthService } from '../../accounts-auth.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAccountComponent {
  constructor(private accountsService: AccountsAuthService) {}
  protected login(): void {
    this.accountsService.login();
  }
}