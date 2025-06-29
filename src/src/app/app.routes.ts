import { Routes } from '@angular/router';

import { Observable } from 'rxjs';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component')
      .then((m) => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then((m) => m.LoginComponent)
  },
  {
    path: 'protected-resource',
    loadComponent: () => import('./components/protected-resource/protected-resource.component')
      .then((m) => m.ProtectedResourceComponent)
  },
  {
    path: 'protected-path',
    loadComponent: () => import('./components/protected-path/protected-path.component')
      .then((m) => m.ProtectedPathComponent)
  },
  {
    path: 'hello',
    loadComponent: () => import('./components/hello/hello.component')
      .then((m) => m.HelloComponent)
  }
];
