import { Component, inject, OnInit } from '@angular/core';
import { JobService } from '../../../../core/services/job-service.ts';
import { JobItem } from "../job-item/job-item";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-list',
  imports: [JobItem, RouterLink],
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss'
})
export class JobList{
  jobService = inject(JobService)
  jobs = this.jobService.jobs;
}
