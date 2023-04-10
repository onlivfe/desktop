import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstancesComponent {
}
