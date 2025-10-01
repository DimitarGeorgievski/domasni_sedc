import { Component, inject } from '@angular/core';
import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { EmailService } from '../../../core/services/email-service';

@Component({
  selector: 'app-contact-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private emailService = inject(EmailService);
  contactGroup = this.generateAddJobForm();
  generateAddJobForm() {
    return new FormGroup({
      contactGroup: new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', Validators.required),
        comment: new FormControl('', [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(500),
        ]),
      }),
    });
  }
  onFormSubmit() {
    if (this.contactGroup.valid) {
      this.contactGroup.markAllAsTouched()
      this.emailService.sendEmail(this.contactGroup.value);
      this.contactGroup.reset();
    }
  }
}
