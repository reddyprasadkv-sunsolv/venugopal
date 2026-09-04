import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { AboutPageComponent } from './pages/about/about';
import { ServicesPageComponent } from './pages/services/services';
import { BooksPageComponent } from './pages/books/books';
import { PhotographyPageComponent } from './pages/photography/photography';
import { ContactPageComponent } from './pages/contact/contact';
import { AdminComponent } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Dr. Chikkala Venugopal Rao | Home' },
  { path: 'about-me', component: AboutPageComponent, title: 'About Me | Dr. Chikkala Venugopal Rao' },
  { path: 'services', component: ServicesPageComponent, title: 'Services & Advisory | Dr. Chikkala Venugopal Rao' },
  { path: 'my-books', component: BooksPageComponent, title: 'My Books & Literary Works | Dr. Chikkala Venugopal Rao' },
  { path: 'photography', component: PhotographyPageComponent, title: 'Photography & Media | Dr. Chikkala Venugopal Rao' },
  { path: 'contact', component: ContactPageComponent, title: 'Contact & Keynote Inquiries | Dr. Chikkala Venugopal Rao' },
  { path: 'admin', component: AdminComponent, title: 'CRM Studio & Content Manager' },
  { path: 'crm', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
