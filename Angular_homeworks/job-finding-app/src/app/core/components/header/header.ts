import { Component, inject } from '@angular/core';
import { JobService } from '../../services/job-service.ts';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  jobService = inject(JobService);

  allJobs = this.jobService.jobLength;
  appliedJobs = this.jobService.AppliedJobs;
}
