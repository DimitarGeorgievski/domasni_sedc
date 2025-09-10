import { computed, Injectable, signal } from '@angular/core';
import { Job } from '../../feature/jobs/models/job.model';
import { mockJobs } from '../../feature/jobs/jobs.mock';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs = signal<Job[]>([]);
  workFilteredJobs = signal<Job[]>(mockJobs);
  sortDirection: 'asc' | 'desc' = 'desc';
  loadJobs() {
    this.jobs.set(mockJobs);
  }
  jobLength = computed(() => this.jobs().length);
  AppliedJobs = computed(() => this.jobs().filter((job) => job.isApplied).length);
  applyJob(jobId: number) {
    this.jobs.update((prev) =>
      prev.map((job) => {
        if (job.id == jobId) return { ...job, isApplied: true };
        return job;
      })
    );
  }
  cancelJob(jobId: number) {
    this.jobs.update((prev) =>
      prev.map((job) => {
        if (job.id == jobId) return { ...job, isApplied: false };
        return job;
      })
    );
  }
  sortByWorkType(workType?: string) {
    const filteredJobs =
      !workType || workType === 'select'
        ? this.workFilteredJobs()
        : this.workFilteredJobs().filter((job) => job.workType === workType);
    this.jobs.set(filteredJobs);
  }
  resetJobs() {
    this.jobs.set(this.workFilteredJobs());
  }
  sortBySalary() {
    const filteredJobs = [...this.jobs()];
    filteredJobs.sort((a, b) => {
      return this.sortDirection === 'asc'
        ? a.startingSalary - b.startingSalary
        : b.startingSalary - a.startingSalary;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.jobs.set(filteredJobs);
  }
}
