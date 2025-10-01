import { Component, inject, OnInit } from '@angular/core';
import { JobItem } from '../job-item/job-item';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/button/button';
import { JobService } from '../../../../core/services/job-service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-list',
  imports: [JobItem, Button],
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss',
})
export class JobList {
  private jobService = inject(JobService);
  private router = inject(Router);

  jobs = this.jobService.getAllJobs();
  sortByWorkType(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.jobService.sortByWorkType(target.value);
  }
  sortBySalary() {
    this.jobService.sortBySalary();
  }
  resetJob() {
    this.jobService.resetJobs();
  }
  onJobClick(job: Job) {
    this.jobService.selectJob(job);
    this.router.navigate(['jobs', job.id]);
  }
}
