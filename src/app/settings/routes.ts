import { Route } from "@angular/router";

export default [
  { path: '', loadComponent: () => import('./settings.component').then((mod) => mod.SettingsComponent), pathMatch: 'full' },
  { path: 'add-account', loadComponent: () => import('./add-account/add-account.component').then((mod) => mod.AddAccountComponent) },
] as Route[];
