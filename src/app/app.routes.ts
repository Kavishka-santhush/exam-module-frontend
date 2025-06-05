import { Routes } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthGuard } from './security/auth.guard';

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
      .then((m) => m.ProtectedPathComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'hello',
    loadComponent: () => import('./components/hello/hello.component')
      .then((m) => m.HelloComponent)
  },
  {
  path: 'editSubject',
  loadComponent: async () => {
    const m = await import('./components/edit-subject/edit-subject.component');
    return m.EditSubjectComponent;
  },
  canActivate: [AuthGuard], // Protect route with AuthGuard
}

  // {
  //   path: 'deleteSubject',
  //   loadComponent: async () => {
  //     const m = await import('./components/edit-subject/edit-subject.component);
  //     return m.deleteSubjectComponent;
  //   },


];
