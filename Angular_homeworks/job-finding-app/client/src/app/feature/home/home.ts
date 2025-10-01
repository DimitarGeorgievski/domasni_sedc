import { Component, inject } from '@angular/core';
import { JobService } from '../../core/services/job-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  jobService = inject(JobService);
}
