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
    path: 'edit-structure',
    loadComponent: () => import('./components/edit-structure/edit-structure.component')
      .then((m) => m.EditStructureComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'hello',
    loadComponent: () => import('./components/hello/hello.component')
      .then((m) => m.HelloComponent)
  },
  {
    path: 'location',
    loadComponent: () => import('./components/location/location.component').then(m => m.LocationComponent)
  },
  {
    path: 'schedule-exam',
    loadComponent: () => import('./components/schedule-exam/schedule-exam.component')
      .then((m) => m.ScheduleExamComponent),

  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component')
      .then((m) => m.AdminDashboardComponent),

  },
  {
    path: 'editSubject',
    loadComponent: () => import('./components/edit-subject/edit-subject.component')
      .then((m) => m.EditSubjectComponent),

  }
];
