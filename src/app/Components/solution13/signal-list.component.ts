import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Country } from '../../services/signal-country.service';

@Component({
  selector: 'app-signal-list',
  standalone: true,
  template: `
    <div class="list-container">
      @for (country of countries(); track country.idd) {
        <div class="country-item">
          <img [src]="country.flags.svg" [alt]="'Flag of ' + country.name" class="country-flag" />
          <div class="country-info">
            <i class="fas fa-search me-2"></i>
            <p class="country-name mb-0">{{ country.name }}</p>
          </div>
        </div>
      }
    </div>
  `,
  imports: [CommonModule],
  styles: [`
    .list-container {
      margin: 1rem 0;
    }
    .country-item {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
    }
    .country-flag {
      width: 30px;
      height: 20px;
      margin-right: 1rem;
    }
    .country-info {
      display: flex;
      align-items: center;
    }
    .country-name {
      margin: 0;
    }
  `]
})
export class SignalListComponent {
  countries = input.required<Country[]>();
}