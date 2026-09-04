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

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('lightbox-backdrop')) {
      this.onClose(event);
    }
  }

  onClose(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.close.emit();
  }
}
