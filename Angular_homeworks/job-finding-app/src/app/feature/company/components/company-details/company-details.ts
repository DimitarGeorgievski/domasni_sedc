import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { JobService } from '../../../../core/services/job-service';
import { CommonModule } from '@angular/common';
import { CompanyDetailsCard } from '../company-details-card/company-details-card';
import { Job } from '../../../jobs/models/job.model';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-company-details',
  imports: [CommonModule, CompanyDetailsCard, Button],
  templateUrl: './company-details.html',
  styleUrl: './company-details.scss',
})
export class CompanyDetails implements OnInit {
  ngOnInit() {
    this.filterByCompanyName();
  }
  jobService = inject(JobService);
  selectedJob = this.jobService.selectedJob;
  activeTab: string = 'home';
  showAllDescriptions = false;
  filteredJobsByCompanyName = signal<Job[]>([]);
  currentPage = signal(1);
  itemsPerPage = 3;
  pages = computed(() => Math.ceil(this.filteredJobsByCompanyName().length / this.itemsPerPage));
  currentJobs = computed(() => {
    const start = this.currentPage() * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredJobsByCompanyName().slice(start, end);
  });
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  filterByCompanyName() {
    const filteredJobs = this.jobService.filterJobsBy(
      this.selectedJob().companyName,
      'companyName'
    );
    this.filteredJobsByCompanyName.set(filteredJobs);
    console.log(this.filteredJobsByCompanyName());
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
