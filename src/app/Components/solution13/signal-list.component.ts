import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Country } from '../../services/signal-country.service';

@Component({
  selector: 'app-signal-list',
  standalone: true,
  template: `
    <div class="list-container">
      @for (country of countries; track country.name) {
        <div class="country-card">
          <img [src]="country.flags.svg" [alt]="country.name" class="flag">
          <div class="country-info">
            <h3>{{ country.name }}</h3>
            <p>Phone: {{ country.idd }}</p>
          </div>
        </div>
      }
    </div>
  `,
  imports: [CommonModule],
  styles: [`
    .list-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    .country-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .flag {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }
    .country-info {
      flex: 1;
    }
    h3 {
      margin: 0;
      font-size: 1.1rem;
    }
    p {
      margin: 0.5rem 0 0;
      font-size: 0.9rem;
      color: #666;
    }
  `]
})
export class SignalListComponent {
  @Input({ required: true }) countries: Country[] = [];
}