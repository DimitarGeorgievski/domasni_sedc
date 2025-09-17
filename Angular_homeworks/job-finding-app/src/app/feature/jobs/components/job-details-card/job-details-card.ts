import { Component, inject, input } from '@angular/core';
import { JobService } from '../../../../core/services/job-service';
import { Job } from '../../models/job.model';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago-pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-job-details-card',
  imports: [TimeAgoPipe, NgClass],
  templateUrl: './job-details-card.html',
  styleUrl: './job-details-card.scss'
})
export class JobDetailsCard {
  jobService = inject(JobService);
  job = input.required<Job>();
  selectedJob = this.jobService.selectedJob;
  onJobClick(job: Job){
    this.jobService.selectJob(job)
  }
  
}
