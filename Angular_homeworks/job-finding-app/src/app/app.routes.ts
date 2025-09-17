import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { JobList } from './feature/jobs/components/job-list/job-list';
import { NotFound } from './core/components/not-found/not-found';
import { Profile } from './feature/profile/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'jobs',
    component: JobList,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'jobs/:id',
    loadComponent: () =>
      import('./feature/jobs/components/job-details/job-details').then((c) => c.JobDetails),
  },
  {
    path: 'company/:id',
    loadComponent: () =>
      import('./feature/company/components/company-details/company-details').then((c) => c.CompanyDetails),
  },
  {
    path: '**',
    component: NotFound,
  },
];
