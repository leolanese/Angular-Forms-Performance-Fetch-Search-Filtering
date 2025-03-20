import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Country } from '../../services/signal-country.service';

@Component({
    selector: 'app-signal-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="list-container">
      @if (countries().length === 0) {
        <div class="no-results">No countries found</div>
      } @else {
        <div class="country-list">
          @for (country of countries(); track country.idd) {
            <div class="country-item">
              <img [src]="country.flags.svg" [alt]="country.name.common" class="flag" />
              <span class="name">{{ country.name.common }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
    styles: [`
    .list-container {
      margin: 1rem 0;
    }
    .country-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .country-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .country-item:hover {
      background-color: #f8f9fa;
      border-color: #007bff;
    }
    .flag {
      width: 24px;
      height: 16px;
      object-fit: cover;
      border-radius: 2px;
    }
    .name {
      font-size: 1rem;
    }
    .no-results {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  `]
})
export class SignalListComponent {
  countries = input.required<Country[]>();
}