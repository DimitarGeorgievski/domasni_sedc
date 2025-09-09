import { computed, Injectable, signal } from '@angular/core';
import { Job } from '../../feature/jobs/models/job.model';
import { mockJobs } from '../../feature/jobs/jobs.mock';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  jobs = signal<Job[]>([]);
  loadJobs() {
    this.jobs.set(mockJobs);
  }
  jobLength = computed(
    () => this.jobs().length
  );
  AppliedJobs = computed(
    () => this.jobs().filter(job => job.isApplied).length
  );
  applyJob(jobId: number){
    this.jobs.update((prev) => prev.map((job) => {
      if(job.id == jobId) return {...job, isApplied: true};
      return job;
    }))
  }
  cancelJob(jobId: number){
    this.jobs.update((prev) => prev.map((job) => {
      if(job.id == jobId) return {...job, isApplied: false};
      return job;
    }))
  }
}
