import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { workType } from '../../models/job.enum';
import { JobService } from '../../../../core/services/job-service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-add-job',
  imports: [ReactiveFormsModule],
  templateUrl: './add-job.html',
  styleUrl: './add-job.scss',
})
export class AddJob {
  jobService = inject(JobService);
  jobForm = this.generateAddJobForm();
  workTypes: string[] = Object.values(workType);
  generateAddJobForm() {
    return new FormGroup({
      jobData: new FormGroup({
        position: new FormControl('', [Validators.required, Validators.maxLength(40)]),
        expires: new FormControl('', Validators.required),
        startingSalary: new FormControl(0, [Validators.required, Validators.min(0)]),
        workType: new FormControl<workType>(workType.ONSITE, Validators.required),
        location: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        country: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(500),
        ]),
      }),
      companyData: new FormGroup({
        companyName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        companyAddress: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        companyIndustry: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        companyFollowers: new FormControl(0, [Validators.required, Validators.min(0)]),
        companyEmployees: new FormControl(0, [Validators.required, Validators.min(0)]),
      }),
    });
  }
  onFormSubmit() {
    this.jobForm.markAllAsTouched();
    if (this.jobForm.invalid) return;
    console.log(this.jobForm.value);
    const formValue = this.jobForm.getRawValue();
    const jobs = this.jobService.getAllJobs()();
    const lastJobId = jobs.length;
    const newJob: Job = {
      id: lastJobId + 1,
      isApplied: false,
      companyWebsite: `https://${formValue.companyData.companyName}.com`,
      createdAt: new Date().toISOString(),
      ...formValue.jobData,
      ...formValue.companyData,
      companyLogo: jobs[1].companyLogo, // neznaev kako da napram pole so ke mozi i ke treba da ima poke stringovi vo array i da proverva dali ima dovolno stringovi i go naprajv vaka kako resenie
      qualifications: jobs[1].qualifications,
      techStack: jobs[1].techStack,
      prefferedSkills: jobs[1].prefferedSkills,
      companyDescription: jobs[1].companyDescription,
    }
    this.jobService.addJob(newJob)
    console.log(jobs);
    this.jobForm.reset();
  }
}
