import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { JobList } from './feature/jobs/components/job-list/job-list';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'jobs',
    component: JobList
  }
];
