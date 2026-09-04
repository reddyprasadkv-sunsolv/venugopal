import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutPageComponent {
  private dataService = inject(DataService);

  readonly profile = this.dataService.profile;
  readonly stats = this.dataService.stats;
  readonly awards = this.dataService.awards;
}
