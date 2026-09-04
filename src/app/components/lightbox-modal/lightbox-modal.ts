import { Component, input, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPhoto } from '../../models/content.models';

@Component({
  selector: 'app-lightbox-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lightbox-modal.html',
  styleUrl: './lightbox-modal.css'
})
export class LightboxModalComponent {
  photo = input<GalleryPhoto | null>(null);
  close = output<void>();

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.onClose();
  }

  onClose(): void {
    this.close.emit();
  }
}
