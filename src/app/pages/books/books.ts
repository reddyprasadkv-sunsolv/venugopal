import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Book } from '../../models/content.models';
import { BookModalComponent } from '../../components/book-modal/book-modal';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookModalComponent],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class BooksPageComponent {
  private dataService = inject(DataService);

  readonly books = this.dataService.books;
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  selectedBook = signal<Book | null>(null);

  categories = ['All', 'Leadership', 'Career', 'HR & Talent', 'Stress Management', 'Spirituality'];

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  get filteredBooks(): Book[] {
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.books().filter((b) => {
      const matchesCat = cat === 'All' || b.category === cat;
      const matchesQuery =
        !query ||
        b.title.toLowerCase().includes(query) ||
        b.subtitle.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });
  }

  openBook(book: Book): void {
    this.selectedBook.set(book);
  }

  closeBook(): void {
    this.selectedBook.set(null);
  }
}
