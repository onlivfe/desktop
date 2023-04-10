import { Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'instances',
    loadComponent: () =>
      import('./instances/instances.component').then(
        (mod) => mod.InstancesComponent
      ),
  },
  {
    path: 'friends',
    loadComponent: () =>
      import('./friends/friends.component').then((mod) => mod.FriendsComponent),
  },
  { path: 'settings', loadChildren: () => import('./settings/routes') },
  { path: '', redirectTo: '/settings/add-account', pathMatch: 'full' },
];

export default ROUTES;
