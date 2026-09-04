import { Component, input, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/content.models';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-modal.html',
  styleUrl: './book-modal.css'
})
export class BookModalComponent {
  book = input<Book | null>(null);
  close = output<void>();

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.onClose();
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('modal-backdrop')) {
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
