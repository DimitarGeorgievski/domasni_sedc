import { Component, inject } from '@angular/core';
import { JobService } from '../../core/services/job-service.ts';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  jobService = inject(JobService);
  ngOnInit() { // dali e najpravilno ovde da se povika loadJobs() oti ova e glaven page i trebat za header-ot podatocite od jobs?
    this.jobService.loadJobs();
  }
}
