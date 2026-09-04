import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { GalleryPhoto } from '../../models/content.models';
import { LightboxModalComponent } from '../../components/lightbox-modal/lightbox-modal';

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [CommonModule, LightboxModalComponent],
  templateUrl: './photography.html',
  styleUrl: './photography.css'
})
export class PhotographyPageComponent {
  private dataService = inject(DataService);

  readonly gallery = this.dataService.gallery;
  selectedCategory = signal<string>('All');
  activePhoto = signal<GalleryPhoto | null>(null);

  categories = ['All', 'Dignitaries', 'Keynotes', 'Mentorship', 'Global Travels'];

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  get filteredPhotos(): GalleryPhoto[] {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.gallery();
    return this.gallery().filter(p => p.category === cat);
  }

  openLightbox(photo: GalleryPhoto): void {
    this.activePhoto.set(photo);
  }

  closeLightbox(): void {
    this.activePhoto.set(null);
  }
}
