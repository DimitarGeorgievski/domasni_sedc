import { inject, Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { NotificationsService } from './notification-service';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId = 'service_y3av95r';
  private templateId = 'template_a0tnlhb';
  private publicKey = 'Nfgzx0-hbPTs7UIQi';
  private notificationService = inject(NotificationsService);
  sendEmail(data: any) {
    const templateParams = {
      from_name: `${data.contactGroup.firstName} ${data.contactGroup.lastName}`,
      from_email: data.contactGroup.email,
      phone: data.contactGroup.phoneNumber,
      message: data.contactGroup.comment,
    };
    emailjs
      .send(this.serviceId, this.templateId, templateParams, {
        publicKey: this.publicKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          this.notificationService.showToast('Successfully send email', true);
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
          this.notificationService.showToast('Failed sending the email', false);
        }
      );
  }
}
