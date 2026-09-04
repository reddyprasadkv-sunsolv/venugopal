import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { LeadInquiry } from '../../models/content.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactPageComponent {
  private dataService = inject(DataService);
  readonly settings = this.dataService.settings;

  // Form Model
  name = signal<string>('');
  email = signal<string>('');
  phone = signal<string>('');
  organization = signal<string>('');
  inquiryType = signal<LeadInquiry['inquiryType']>('Keynote Speaker');
  eventDate = signal<string>('');
  message = signal<string>('');

  isSubmitting = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Active FAQ
  openFaqId = signal<number | null>(0);

  faqs = [
    {
      q: 'How far in advance should we invite Dr. Venugopal for a keynote speech?',
      a: 'We recommend requesting dates at least 4 to 8 weeks in advance for national conventions and 8 to 12 weeks for international summits to ensure date availability and tailored presentation customization.'
    },
    {
      q: 'Can Dr. Venugopal deliver customized corporate consulting workshops for our leadership team?',
      a: 'Yes, through Verch Consulting LLP, Dr. Venugopal conducts bespoke executive workshops (1-day, 2-day, or multi-week modular programs) on Beyond Bossing, Performance Engineering, and Smart Hiring.'
    },
    {
      q: 'Does Dr. Venugopal conduct campus skilling drives for universities and colleges?',
      a: 'Absolutely. Having mentored over 27,000+ students and created 3 World Records, Dr. Venugopal regularly keynotes college convocations and conducts Campus-to-Corporate transition bootcamps.'
    },
    {
      q: 'How can our institution purchase bulk copies of Dr. Venugopal’s books with author signatures?',
      a: 'You can submit your bulk order request via the contact form above with the subject "Book Query" or reach out directly to info@drchikkalavenugopalrao.com.'
    }
  ];

  toggleFaq(idx: number): void {
    this.openFaqId.update(curr => curr === idx ? null : idx);
  }

  onSubmit(): void {
    if (!this.name() || !this.email() || !this.phone() || !this.message()) {
      this.errorMessage.set('Please complete all required fields (Name, Email, Phone, and Message).');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    setTimeout(() => {
      this.dataService.addLead({
        name: this.name(),
        email: this.email(),
        phone: this.phone(),
        organization: this.organization() || undefined,
        inquiryType: this.inquiryType(),
        eventDate: this.eventDate() || undefined,
        message: this.message()
      });

      this.isSubmitting.set(false);
      this.isSubmitted.set(true);

      // Reset form fields
      this.name.set('');
      this.email.set('');
      this.phone.set('');
      this.organization.set('');
      this.inquiryType.set('Keynote Speaker');
      this.eventDate.set('');
      this.message.set('');
    }, 600);
  }
}
