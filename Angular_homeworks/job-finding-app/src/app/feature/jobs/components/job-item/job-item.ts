import { Component, inject, input } from '@angular/core';
import { Job } from '../../models/job.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Button } from "../../../../shared/components/button/button";
import { HoverShadowDirective } from '../../../../core/directives/hover-shadow-directive';
import { JobService } from '../../../../core/services/job-service';

@Component({
  selector: 'app-job-item',
  imports: [CurrencyPipe, DatePipe, Button, HoverShadowDirective],
  templateUrl: './job-item.html',
  styleUrl: './job-item.scss',
})
export class JobItem {
  job = input.required<Job>();

  jobService = inject(JobService);
  onJobApply(e: any) {
    event?.stopPropagation?.();
    this.jobService.applyJob(this.job().id);
  }
  onJobCancel(e: any){
    event?.stopPropagation?.();
    this.jobService.cancelJob(this.job().id);
  }
}
