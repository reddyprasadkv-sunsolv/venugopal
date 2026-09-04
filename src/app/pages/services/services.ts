import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ServiceItem } from '../../models/content.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesPageComponent {
  private dataService = inject(DataService);

  readonly services = this.dataService.services;
  selectedCategory = signal<string>('All');

  categories = ['All', 'Corporate Advisory', 'Executive Training', 'Youth Skilling', 'Talent Search', 'Keynotes & Seminars', 'Wellness'];

  filterServices(cat: string): void {
    this.selectedCategory.set(cat);
  }

  get filteredServices(): ServiceItem[] {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.services();
    return this.services().filter(s => s.badge.toLowerCase().includes(cat.toLowerCase()) || s.title.toLowerCase().includes(cat.toLowerCase()));
  }
}
