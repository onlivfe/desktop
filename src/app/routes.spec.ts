import { TestBed } from '@angular/core/testing';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';
import ROUTES from './routes';
import { InstancesComponent } from './instances/instances.component';
import { FriendsComponent } from './friends/friends.component';
import { SettingsComponent } from './settings/settings.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Routes', () => {
  let routerHarness: RouterTestingHarness;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(ROUTES), NoopAnimationsModule],
    }).compileComponents();
    routerHarness = await RouterTestingHarness.create();
  });

  it('should have instances route', async () => {
    const activatedComponent = await routerHarness.navigateByUrl('/instances');
    expect(activatedComponent).toBeInstanceOf(InstancesComponent);
  });

  it('should have friends route', async () => {
    const activatedComponent = await routerHarness.navigateByUrl('/friends');
    expect(activatedComponent).toBeInstanceOf(FriendsComponent);
  });

  it('should have settings route', async () => {
    const activatedComponent = await routerHarness.navigateByUrl('/settings');
    expect(activatedComponent).toBeInstanceOf(SettingsComponent);
  });
});
