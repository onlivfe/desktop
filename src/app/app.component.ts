import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  template: `<mat-sidenav-container>
    <app-nav></app-nav>
    <main><router-outlet></router-outlet></main>
  </mat-sidenav-container>`,
  standalone: true,
  imports: [RouterOutlet, NavComponent, MatSidenavModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
