import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private router = inject(Router);
  isAdminRoute = typeof window !== 'undefined' ? (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/crm')) : false;

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.isAdminRoute = event.urlAfterRedirects.startsWith('/admin') || event.urlAfterRedirects.startsWith('/crm');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
