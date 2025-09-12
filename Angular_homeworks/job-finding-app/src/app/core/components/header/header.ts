import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JobService } from '../../services/job-service';

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
