import { computed, Injectable, signal } from '@angular/core';
import { Job } from '../../feature/jobs/models/job.model';
import { mockJobs } from '../../feature/jobs/jobs.mock';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobs = signal<Job[]>([]);
  private isLoaded = false;
  workFilteredJobs = signal<Job[]>(mockJobs);
  selectedJobId = signal<number>(null);
  sortDirection: 'asc' | 'desc' = 'desc';
  constructor() {
    this.getAllJobs();
  }
  loadJobs() {
    this.jobs.set(mockJobs);
    this.isLoaded = true;
  }
  jobLength = computed(() => this.jobs().length);
  AppliedJobs = computed(() => this.jobs().filter((job) => job.isApplied).length);
  selectedJob = computed(() => this.jobs().find((j) => j.id === this.selectedJobId()));
  getAllJobs() {
    if (!this.isLoaded) {
      this.loadJobs();
    }
    return this.jobs;
  }
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
  selectJob(job: Job) {
    this.selectedJobId.set(job.id);
  }
  filterJobsBy(filter: string, filterBy: string): Job[] {
    let jobs = this.getAllJobs()();
    let result: Job[] = []
    filter = filter.toLowerCase();
    if(!filter) return jobs;
    if(filterBy === 'companyName'){
      result = jobs.filter((job: Job) => job.companyName.toLowerCase().includes(filter));
    }
    if(filterBy === 'workType'){
      result = jobs.filter((job: Job) => job.workType.toLowerCase().includes(filter))
    }
    if(filterBy === 'location'){
      result = jobs.filter((job: Job) => job.location.toLowerCase().includes(filter))
    }
    return result
  }
}
