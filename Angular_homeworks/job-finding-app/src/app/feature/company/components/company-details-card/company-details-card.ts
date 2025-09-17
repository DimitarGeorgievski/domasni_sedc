import { Component, inject, input } from '@angular/core';
import { Job } from '../../../jobs/models/job.model';
import { JobService } from '../../../../core/services/job-service';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-details-card',
  imports: [TimeAgoPipe, RouterLink],
  templateUrl: './company-details-card.html',
  styleUrl: './company-details-card.scss',
})
export class CompanyDetailsCard {
  jobService = inject(JobService);
  job = input.required<Job>();
  selectedJob = this.jobService.selectedJob;
  onJobClick(job: Job) {
    this.jobService.selectJob(job);
  }
}
