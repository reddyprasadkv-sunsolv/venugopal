import { Component, input, output } from '@angular/core';
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

  onClose(): void {
    this.close.emit();
  }
}
