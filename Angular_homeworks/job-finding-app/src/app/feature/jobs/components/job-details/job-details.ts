import { Component, inject, OnInit, signal } from '@angular/core';
import { JobService } from '../../../../core/services/job-service';
import { CommonModule } from '@angular/common';
import { Button } from '../../../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { JobDetailsCard } from "../job-details-card/job-details-card";
import { TimeAgoPipe } from '../../../../core/pipes/time-ago-pipe';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-details',
  imports: [CommonModule, Button, RouterLink, JobDetailsCard, TimeAgoPipe],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss'
})
export class JobDetails implements OnInit{
  jobService = inject(JobService)
  selectedJob = this.jobService.selectedJob
  filteredJobsByCompany = signal<Job[]>([])
  filteredJobsByWorkType = signal<Job[]>([])
  showAllDescriptions = false;
  ngOnInit(){
    this.filteredJobsByCompanyName(this.selectedJob().companyName)
    this.filteredJobsByWork(this.selectedJob().workType)
  }
  onJobApply(e: any) {
    event?.stopPropagation?.();
    this.jobService.applyJob(this.selectedJob().id);
  }
  onJobCancel(e: any){
    event?.stopPropagation?.();
    this.jobService.cancelJob(this.selectedJob().id);
  }
  filteredJobsByCompanyName(companyName: string){
    const filteredJobs = this.jobService.filterJobsBy(companyName, "companyName");
  this.filteredJobsByCompany.set(filteredJobs);
  }
  filteredJobsByWork(workType: string){
    const filteredJobs = this.jobService.filterJobsBy(workType, "workType");
  this.filteredJobsByWorkType.set(filteredJobs);
  }
}
