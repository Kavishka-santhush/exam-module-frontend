import { Routes } from '@angular/router';
import { AuthGuard } from './security/auth.guard';
import { LayoutComponent } from './container/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
            },
            {
                path: 'exam-criteria',
                loadComponent: () => import('./exam-criteria/exam-criteria.component').then(m => m.ExamCriteriaComponent)
            },
            {
                path: 'location',
                loadComponent: () => import('./components/location/location.component').then(m => m.LocationComponent)
            },
            {
                path: 'schedule-exam',
                loadComponent: () => import('./components/schedule-exam/schedule-exam.component').then(m => m.ScheduleExamComponent)
            },
            {
                path: 'edit-subject',
                loadComponent: () => import('./components/edit-subject/edit-subject.component').then(m => m.EditSubjectComponent)
            },
            {
                path: 'edit-structure',
                loadComponent: () => import('./components/edit-structure/edit-structure.component').then(m => m.EditStructureComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
