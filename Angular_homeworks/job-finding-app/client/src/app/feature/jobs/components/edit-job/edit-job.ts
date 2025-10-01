import { Component, inject, signal } from '@angular/core';
import { JobService } from '../../../../core/services/job-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { workType } from '../../models/job.enum';
import { Job } from '../../models/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-job.html',
  styleUrl: './edit-job.scss'
})
export class EditJob {
  jobService = inject(JobService);
  private router = inject(Router);
  selectedEditJob = signal<Job>(null);
  jobForm = this.generateAddJobForm();
  workTypes: string[] = Object.values(workType);
  ngOnInit(){
    const job = this.jobService.selectedEditJob();
    console.log(job);
    this.selectedEditJob.set(job);
    this.jobForm.patchValue({
      jobData: {
        position: this.selectedEditJob().position,
        expires: this.selectedEditJob().expires,
        startingSalary: this.selectedEditJob().startingSalary,
        location: this.selectedEditJob().location,
        country: this.selectedEditJob().country,
        description: this.selectedEditJob().description,
      },
      companyData: {
        companyName: this.selectedEditJob().companyName,
        companyAddress: this.selectedEditJob().companyAddress,
        companyIndustry: this.selectedEditJob().companyIndustry,
        companyFollowers: this.selectedEditJob().companyFollowers,
        companyEmployees: this.selectedEditJob().companyEmployees,
      }
    })
  }
  generateAddJobForm() {
    return new FormGroup({
      jobData: new FormGroup({
        position: new FormControl( "", [Validators.required, Validators.maxLength(40)]),
        expires: new FormControl( "", Validators.required),
        startingSalary: new FormControl(0, [Validators.required, Validators.min(0)]),
        workType: new FormControl<workType>(workType.ONSITE, Validators.required),
        location: new FormControl( "", [Validators.required, Validators.maxLength(30)]),
        country: new FormControl( "", [Validators.required, Validators.maxLength(20)]),
        description: new FormControl( "", [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(500),
        ]),
      }),
      companyData: new FormGroup({
        companyName: new FormControl( "", [Validators.required, Validators.maxLength(50)]),
        companyAddress: new FormControl( "", [Validators.required, Validators.maxLength(60)]),
        companyIndustry: new FormControl( "", [Validators.required, Validators.maxLength(30)]),
        companyFollowers: new FormControl( 0, [Validators.required, Validators.min(0)]),
        companyEmployees: new FormControl( 0, [Validators.required, Validators.min(0)]),
      }),
    });
  }
  onFormSubmit(){
    this.jobForm.markAllAsTouched;
    if (this.jobForm.invalid) return;
    const formValue = this.jobForm.getRawValue();
    const job = this.jobService.selectedEditJob;
    console.log(formValue);
    if(!job) return;
    const updatedJob = {
      ...job(),
      ...formValue.jobData,
      ...formValue.companyData,
    }
    this.jobService.updateJob(updatedJob);
    this.router.navigate(['/jobs'])
  }
}
