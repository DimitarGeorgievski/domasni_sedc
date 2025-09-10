import { Component, inject, OnInit } from '@angular/core';
import { JobItem } from '../job-item/job-item';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/button/button';
import { JobService } from '../../../../core/services/job-service';

@Component({
  selector: 'app-job-list',
  imports: [JobItem, RouterLink, Button],
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss',
})
export class JobList implements OnInit {
  jobService = inject(JobService);
  ngOnInit() {
    this.jobService.loadJobs();
  }
  jobs = this.jobService.jobs;
  sortByWorkType(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.jobService.sortByWorkType(target.value);
  }
  sortBySalary(){
    this.jobService.sortBySalary();
  }
  resetJob(){
    this.jobService.resetJobs();
  }
}
