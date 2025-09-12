import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { JobList } from './feature/jobs/components/job-list/job-list';
import { NotFound } from './core/components/not-found/not-found';

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
    path: 'jobs/:id',
    loadComponent: () =>
      import('./feature/jobs/components/job-details/job-details').then((c) => c.JobDetails),
  },
  {
    path: '**',
    component: NotFound,
  },
];
