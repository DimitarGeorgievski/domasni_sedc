import { Component, computed, inject, signal } from '@angular/core';
import { JobService } from '../../../core/services/job-service';
import { Job } from '../../jobs/models/job.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,Button],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  jobService = inject(JobService);
  private router = inject(Router);
  jobs = this.jobService.getAllJobs();
  filteredJobsByApplied = signal<Job[]>([]);
  currentPage = signal(1);
  itemsPerPage = 3;
  pages = computed(() => Math.ceil(this.filteredJobsByApplied().length / this.itemsPerPage));
  currentJobs = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredJobsByApplied().slice(start, end);
  });
  ngOnInit(){
    this.filterJobsByApplied();
  }
  filterJobsByApplied() {
    const filteredJobs = this.jobService.filterJobsBy('', 'isApplied');
    this.filteredJobsByApplied.set(filteredJobs);
    console.log(this.filteredJobsByApplied())
  }
  onJobClick(job: Job){
    this.jobService.selectJob(job);
    this.router.navigate(['company', job.companyName]);
  }
  previousPage() {
    if (this.currentPage() > 0) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
  nextPage() {
    if (this.currentPage() < this.pages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }
}
