import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import {
  HeroData,
  AuthorProfile,
  StatMetric,
  BentoPillar,
  FeaturedVideo,
  Book,
  Award,
  ServiceItem,
  GalleryPhoto,
  LeadInquiry,
  SiteSettings
} from '../../models/content.models';

export type AdminTab = 
  | 'overview' 
  | 'hero' 
  | 'pillars' 
  | 'stats' 
  | 'video'
  | 'about' 
  | 'services' 
  | 'books' 
  | 'awards' 
  | 'gallery' 
  | 'leads' 
  | 'settings';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {
  private dataService = inject(DataService);
  private authService = inject(AuthService);
  private sanitizer = inject(DomSanitizer);

  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly siteData = this.dataService.siteData;
  readonly hero = this.dataService.hero;
  readonly profile = this.dataService.profile;
  readonly stats = this.dataService.stats;
  readonly bentoPillars = this.dataService.bentoPillars;
  readonly featuredVideo = this.dataService.featuredVideo;
  readonly books = this.dataService.books;
  readonly services = this.dataService.services;
  readonly awards = this.dataService.awards;
  readonly gallery = this.dataService.gallery;
  readonly leads = this.dataService.leads;
  readonly settings = this.dataService.settings;

  // Active Tab
  currentTab = signal<AdminTab>('overview');

  // Auth Model
  pinInput = signal<string>('');
  authError = signal<string>('');

  // Toast Notification
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'info' | 'error'>('success');

  // Form State Clones for Editing
  heroForm = signal<HeroData>({ ...this.hero() });
  profileForm = signal<AuthorProfile>(JSON.parse(JSON.stringify(this.profile())));
  pillarsForm = signal<BentoPillar[]>(JSON.parse(JSON.stringify(this.bentoPillars())));
  statsForm = signal<StatMetric[]>(JSON.parse(JSON.stringify(this.stats())));
  videoForm = signal<FeaturedVideo>(JSON.parse(JSON.stringify(this.featuredVideo())));
  settingsForm = signal<SiteSettings>(JSON.parse(JSON.stringify(this.settings())));

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

  // Modal / Inline Edit States for CRUD
  editingBook = signal<Book | null>(null);
  isAddingBook = signal<boolean>(false);
  newBookForm = signal<Omit<Book, 'id'>>({
    title: '',
    subtitle: '',
    category: 'Leadership',
    author: 'Dr. Chikkala Venugopal Rao',
    coverImage: 'images/books/beyond_bossing.jpg',
    description: '',
    keyTakeaways: ['Key takeaway 1', 'Key takeaway 2'],
    pages: 200,
    publisher: 'Verch Publications',
    amazonUrl: 'https://www.amazon.in',
    isUnveiledByVIP: false,
    vipNote: '',
    featured: true
  });

  editingService = signal<ServiceItem | null>(null);
  isAddingService = signal<boolean>(false);
  newServiceForm = signal<Omit<ServiceItem, 'id'>>({
    title: '',
    subtitle: '',
    icon: 'briefcase',
    image: 'images/ad.jpg',
    description: '',
    targetAudience: 'Corporates & Leaders',
    keyDeliverables: ['Deliverable 1', 'Deliverable 2'],
    badge: 'Corporate Advisory'
  });

  editingAward = signal<Award | null>(null);
  isAddingAward = signal<boolean>(false);
  newAwardForm = signal<Omit<Award, 'id'>>({
    title: '',
    conferredBy: '',
    year: new Date().getFullYear().toString(),
    description: '',
    iconType: 'trophy',
    badgeColor: '#00b4d8',
    image: ''
  });

  editingPhoto = signal<GalleryPhoto | null>(null);
  isAddingPhoto = signal<boolean>(false);
  newPhotoForm = signal<Omit<GalleryPhoto, 'id'>>({
    title: '',
    category: 'Keynotes',
    imageUrl: 'images/ad.jpg',
    caption: '',
    location: 'Hyderabad',
    year: '2026',
    featured: true
  });

  // PIN settings
  newPinInput = signal<string>('');

  setTab(tab: AdminTab): void {
    this.currentTab.set(tab);
    // Refresh cloned models from signal
    this.heroForm.set({ ...this.hero() });
    this.profileForm.set(JSON.parse(JSON.stringify(this.profile())));
    this.pillarsForm.set(JSON.parse(JSON.stringify(this.bentoPillars())));
    this.videoForm.set(JSON.parse(JSON.stringify(this.featuredVideo())));
    this.settingsForm.set(JSON.parse(JSON.stringify(this.settings())));
    this.statsForm.set(JSON.parse(JSON.stringify(this.stats())));
  }

  showToast(msg: string, type: 'success' | 'info' | 'error' = 'success'): void {
    this.toastMessage.set(msg);
    this.toastType.set(type);
    setTimeout(() => {
      this.toastMessage.set('');
    }, 3500);
  }

  // Authentication
  async login(): Promise<void> {
    const success = await this.authService.login(this.pinInput());
    if (success) {
      this.authError.set('');
      this.pinInput.set('');
      this.showToast('Welcome to CRM Studio!');
    } else {
      this.authError.set('Incorrect PIN. (Default PIN is 1234 or admin2026)');
    }
  }

  logout(): void {
    this.authService.logout();
    this.showToast('Logged out successfully', 'info');
  }

  async changePin(): Promise<void> {
    if (this.newPinInput().length >= 4) {
      await this.authService.setCustomPin(this.newPinInput());
      this.newPinInput.set('');
      this.showToast('PIN updated successfully!');
    } else {
      this.showToast('PIN must be at least 4 characters', 'error');
    }
  }

  // Hero & Profile Save
  saveHero(): void {
    this.dataService.updateHero(this.heroForm());
    this.showToast('Hero section updated successfully!');
  }

  saveProfile(): void {
    this.dataService.updateProfile(this.profileForm());
    this.showToast('Executive profile, degrees & records updated!');
  }

  savePillars(): void {
    this.dataService.updateBentoPillars(this.pillarsForm());
    this.showToast('Core Philosophy Bento Pillars updated!');
  }

  saveStats(): void {
    this.dataService.updateStats(this.statsForm());
    this.showToast('Impact metrics counters updated!');
  }

  saveVideo(): void {
    this.dataService.updateFeaturedVideo(this.videoForm());
    this.showToast('Keynote speech video spotlight updated successfully!');
  }

  saveSettings(): void {
    this.dataService.updateSettings(this.settingsForm());
    this.showToast('Site settings, contact & socials updated!');
  }

  // Helper actions for dynamic arrays in About / Profile
  addDegree(): void {
    this.profileForm().education.push({
      degree: 'Degree Title (e.g. MBA / PhD / PostDoc)',
      institution: 'University / Board Name',
      description: 'Key academic focus or specialization'
    });
  }

  removeDegree(idx: number): void {
    this.profileForm().education.splice(idx, 1);
  }

  addWorldRecord(): void {
    this.profileForm().worldRecords.push({
      recordBook: 'Record Book Name (e.g. London Book of World Records)',
      achievement: 'Record citation and accomplishment details',
      year: new Date().getFullYear().toString()
    });
  }

  removeWorldRecord(idx: number): void {
    this.profileForm().worldRecords.splice(idx, 1);
  }

  addBioParagraph(): void {
    this.profileForm().bioParagraphs.push('New biography paragraph text...');
  }

  removeBioParagraph(idx: number): void {
    this.profileForm().bioParagraphs.splice(idx, 1);
  }

  addStat(): void {
    this.statsForm().push({
      id: 'stat-' + Date.now(),
      label: 'New Metric Label',
      value: 100,
      suffix: '+',
      description: 'Impact description'
    });
  }

  removeStat(idx: number): void {
    this.statsForm().splice(idx, 1);
  }

  onProfileImageUpload(event: Event): void {
    this.readImageFile(event, (dataUrl) => {
      this.profileForm().profileImage = dataUrl;
      this.profileForm.set({ ...this.profileForm(), profileImage: dataUrl });
    });
  }

  // Image Upload helpers (converts file to data URL and binds safely)
  readImageFile(event: Event, callback: (dataUrl: string) => void): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 20 * 1024 * 1024) {
        this.showToast('Image size should be less than 20MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          callback(e.target.result as string);
          this.showToast('Image uploaded and preview updated!');
          input.value = '';
        }
      };
      reader.onerror = () => {
        this.showToast('Failed to read image file', 'error');
      };
      reader.readAsDataURL(file);
    }
  }

  onHeroImageUpload(event: Event): void {
    this.readImageFile(event, (dataUrl) => {
      this.heroForm().heroImage = dataUrl;
      this.heroForm.set({ ...this.heroForm(), heroImage: dataUrl });
    });
  }

  onVideoImageUpload(event: Event): void {
    this.readImageFile(event, (dataUrl) => {
      const curr = this.videoForm();
      this.videoForm.set({
        ...curr,
        imageUrl: dataUrl,
        mediaType: 'image'
      });
    });
  }

  setVideoMediaType(type: 'video' | 'image'): void {
    const curr = this.videoForm();
    this.videoForm.set({
      ...curr,
      mediaType: type
    });
  }

  onNewBookCoverUpload(event: Event): void {
    this.readImageFile(event, (dataUrl) => {
      this.newBookForm().coverImage = dataUrl;
      this.newBookForm.set({ ...this.newBookForm(), coverImage: dataUrl });
    });
  }

  onEditBookCoverUpload(event: Event, book: Book): void {
    this.readImageFile(event, (dataUrl) => {
      book.coverImage = dataUrl;
    });
  }

  onNewPhotoUpload(event: Event): void {
    this.readImageFile(event, (dataUrl) => {
      this.newPhotoForm().imageUrl = dataUrl;
      this.newPhotoForm.set({ ...this.newPhotoForm(), imageUrl: dataUrl });
    });
  }

  onEditPhotoUpload(event: Event, photo: GalleryPhoto): void {
    this.readImageFile(event, (dataUrl) => {
      photo.imageUrl = dataUrl;
    });
  }

  onNewAwardImageUpload(event: Event): void {
    this.readImageFile(event, (dataUrl) => {
      this.newAwardForm().image = dataUrl;
      this.newAwardForm.set({ ...this.newAwardForm(), image: dataUrl });
    });
  }

  onEditAwardImageUpload(event: Event, award: Award): void {
    this.readImageFile(event, (dataUrl) => {
      award.image = dataUrl;
    });
  }

  // Books CRUD
  startAddBook(): void {
    this.isAddingBook.set(true);
    this.editingBook.set(null);
  }

  saveNewBook(): void {
    const b = this.newBookForm();
    if (!b.title) {
      this.showToast('Book title is required', 'error');
      return;
    }
    this.dataService.addBook(b);
    this.isAddingBook.set(false);
    this.showToast(`Book "${b.title}" added to library!`);
  }

  editBook(book: Book): void {
    this.editingBook.set(JSON.parse(JSON.stringify(book)));
    this.isAddingBook.set(false);
  }

  saveEditedBook(): void {
    const b = this.editingBook();
    if (b) {
      this.dataService.updateBook(b);
      this.editingBook.set(null);
      this.showToast(`Book "${b.title}" updated!`);
    }
  }

  deleteBook(book: Book): void {
    if (confirm(`Are you sure you want to delete book "${book.title}"?`)) {
      this.dataService.deleteBook(book.id);
      this.showToast(`Book "${book.title}" deleted`, 'info');
    }
  }

  // Services CRUD
  startAddService(): void {
    this.isAddingService.set(true);
    this.editingService.set(null);
  }

  saveNewService(): void {
    const s = this.newServiceForm();
    if (!s.title) {
      this.showToast('Service title is required', 'error');
      return;
    }
    this.dataService.addService(s);
    this.isAddingService.set(false);
    this.showToast(`Service "${s.title}" created!`);
  }

  editService(svc: ServiceItem): void {
    this.editingService.set(JSON.parse(JSON.stringify(svc)));
    this.isAddingService.set(false);
  }

  saveEditedService(): void {
    const s = this.editingService();
    if (s) {
      this.dataService.updateService(s);
      this.editingService.set(null);
      this.showToast(`Service "${s.title}" updated!`);
    }
  }

  deleteService(svc: ServiceItem): void {
    if (confirm(`Are you sure you want to delete service "${svc.title}"?`)) {
      this.dataService.deleteService(svc.id);
      this.showToast(`Service "${svc.title}" deleted`, 'info');
    }
  }

  // Awards CRUD
  startAddAward(): void {
    this.isAddingAward.set(true);
    this.editingAward.set(null);
  }

  saveNewAward(): void {
    const a = this.newAwardForm();
    if (!a.title) {
      this.showToast('Award title is required', 'error');
      return;
    }
    this.dataService.addAward(a);
    this.isAddingAward.set(false);
    this.showToast(`Award "${a.title}" added!`);
  }

  editAward(award: Award): void {
    this.editingAward.set(JSON.parse(JSON.stringify(award)));
    this.isAddingAward.set(false);
  }

  saveEditedAward(): void {
    const a = this.editingAward();
    if (a) {
      this.dataService.updateAward(a);
      this.editingAward.set(null);
      this.showToast(`Award "${a.title}" updated!`);
    }
  }

  deleteAward(award: Award): void {
    if (confirm(`Delete award "${award.title}"?`)) {
      this.dataService.deleteAward(award.id);
      this.showToast(`Award "${award.title}" deleted`, 'info');
    }
  }

  // Gallery CRUD
  startAddPhoto(): void {
    this.isAddingPhoto.set(true);
    this.editingPhoto.set(null);
  }

  saveNewPhoto(): void {
    const p = this.newPhotoForm();
    if (!p.title) {
      this.showToast('Photo title is required', 'error');
      return;
    }
    this.dataService.addGalleryPhoto(p);
    this.isAddingPhoto.set(false);
    this.showToast(`Photo "${p.title}" added to gallery!`);
  }

  editPhoto(photo: GalleryPhoto): void {
    this.editingPhoto.set(JSON.parse(JSON.stringify(photo)));
    this.isAddingPhoto.set(false);
  }

  saveEditedPhoto(): void {
    const p = this.editingPhoto();
    if (p) {
      this.dataService.updateGalleryPhoto(p);
      this.editingPhoto.set(null);
      this.showToast(`Photo "${p.title}" updated!`);
    }
  }

  deletePhoto(photo: GalleryPhoto): void {
    if (confirm(`Delete photo "${photo.title}"?`)) {
      this.dataService.deleteGalleryPhoto(photo.id);
      this.showToast(`Photo "${photo.title}" deleted`, 'info');
    }
  }

  // Leads CRM
  updateLead(id: string, status: LeadInquiry['status'], notes?: string): void {
    this.dataService.updateLeadStatus(id, status, notes);
    this.showToast('Lead status updated!');
  }

  deleteLead(lead: LeadInquiry): void {
    if (confirm(`Delete inquiry from ${lead.name}?`)) {
      this.dataService.deleteLead(lead.id);
      this.showToast('Inquiry removed from CRM', 'info');
    }
  }

  // Data Export & Import
  exportJson(): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(this.dataService.exportData());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `dr_venugopal_site_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('Site data exported to JSON backup file!');
  }

  handleImportJson(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          const ok = this.dataService.importData(text);
          if (ok) {
            this.showToast('Backup imported successfully!');
            this.setTab('overview');
          } else {
            this.showToast('Failed to import. Invalid JSON structure.', 'error');
          }
        }
      };
      reader.readAsText(input.files[0]);
    }
  }

  resetSeedData(): void {
    if (confirm('Are you sure you want to reset all site content and images back to default seed data?')) {
      this.dataService.resetToDefaultData();
      this.setTab('overview');
      this.showToast('Site content reset to default successfully!');
    }
  }

  clearCache(): void {
    if (confirm('Clear local browser cache and reload fresh data? Any unsaved edits will be reset.')) {
      this.dataService.clearAllCache();
    }
  }
}
