import { Component, inject, signal, OnInit, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { Book } from '../../models/content.models';
import { BookModalComponent } from '../../components/book-modal/book-modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, BookModalComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePageComponent implements OnInit {
  private dataService = inject(DataService);
  private el = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  readonly hero = this.dataService.hero;
  readonly profile = this.dataService.profile;
  readonly stats = this.dataService.stats;
  readonly bentoPillars = this.dataService.bentoPillars;
  readonly featuredVideo = this.dataService.featuredVideo;
  readonly featuredBooks = this.dataService.featuredBooks;
  readonly awards = this.dataService.awards;
  readonly services = this.dataService.services;

  selectedBook = signal<Book | null>(null);
  activeStatCounts = signal<{ [key: string]: number }>({});
  private animatedStats = false;

  getSafeVideoUrl(url: string): SafeResourceUrl {
    let embedUrl = url || 'https://www.youtube-nocookie.com/embed/vLFxOOEyhUE?iv_load_policy=3&rel=0';
    if (url) {
      if (url.includes('watch?v=')) {
        const videoId = url.split('watch?v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?iv_load_policy=3&rel=0`;
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?iv_load_policy=3&rel=0`;
      } else if (!url.startsWith('http') && url.trim().length > 0) {
        embedUrl = `https://www.youtube-nocookie.com/embed/${url.trim()}?iv_load_policy=3&rel=0`;
      }
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  openBookModal(book: Book): void {
    this.selectedBook.set(book);
  }

  closeBookModal(): void {
    this.selectedBook.set(null);
  }

  getPillarIcon(idx: number): string {
    switch (idx) {
      case 0: return 'fa-solid fa-graduation-cap';
      case 1: return 'fa-solid fa-briefcase';
      case 2: return 'fa-solid fa-bullseye';
      case 3: return 'fa-solid fa-trophy';
      default: return 'fa-solid fa-star';
    }
  }

  getPillarHighlights(idx: number): string[] {
    switch (idx) {
      case 0: return ['PhD, LLB, MBA-HR', 'Andhra University', '16+ Yrs Legacy'];
      case 1: return ['Verch Consulting LLP', 'Strategic HR', 'Executive Search'];
      case 2: return ['27,000+ Mentored', 'Skill Gap Eradication', 'Career Clarity'];
      case 3: return ['3 World Records', '9+ Landmark Books', '125+ Keynotes'];
      default: return [];
    }
  }

  getPillarIndexNumber(idx: number): string {
    return `0${idx + 1}`;
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animatedStats) {
            this.animatedStats = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      const statsSection = this.el.nativeElement.querySelector('.metrics-bento-section');
      if (statsSection) {
        observer.observe(statsSection);
      }
    }, 100);
  }

  private animateCounters(): void {
    const statsList = this.stats();
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounts = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const counts: { [key: string]: number } = {};
      statsList.forEach((st) => {
        counts[st.id] = Math.floor(st.value * ease);
      });

      this.activeStatCounts.set(counts);

      if (progress < 1) {
        requestAnimationFrame(updateCounts);
      } else {
        const finalCounts: { [key: string]: number } = {};
        statsList.forEach((st) => {
          finalCounts[st.id] = st.value;
        });
        this.activeStatCounts.set(finalCounts);
      }
    };

    requestAnimationFrame(updateCounts);
  }

  getDisplayCount(statId: string, defaultValue: number): number {
    const currentCounts = this.activeStatCounts();
    return currentCounts[statId] !== undefined ? currentCounts[statId] : defaultValue;
  }
}
