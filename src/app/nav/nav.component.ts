import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatTooltipModule,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { appWindow } from '@tauri-apps/api/window';

const TOOLTIP_OPTS: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 0,
  touchendHideDelay: 100,
};

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: ['.spacer { flex: 1 1 auto; }'],
  standalone: true,
  providers: [
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: TOOLTIP_OPTS,
    },
  ],
  imports: [
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  constructor(private snackBar: MatSnackBar) {}

  protected exit() {
    appWindow.close().catch((err) => {
      console.error(err);
      this.snackBar.open(
        $localize`:@@exit-window-toast:Closing the window failed toast message`,
        undefined,
        { duration: 2500 }
      );
    });
  }
}
