import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country } from '../../Modules/country';
import { HttpResourceCountryService } from '../../services/httpResource-country.service';

@Component({
  selector: 'app-solution15',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>{{ title }}</h3>
    <div class="container">
      <div class="search-container">
        <input
          type="text"
          [ngModel]="searchTerm()"
          (ngModelChange)="searchTerm.set($event)"
          placeholder="Search countries..."
          class="search-input"
        />

        <div class="stats">
          <span>Found: {{ filteredCountries().length }} countries</span>
          <span>Loading: {{ isLoading() ? 'Yes' : 'No' }}</span>
        </div>
      </div>

      @if (isLoading()) {
        <div class="loading">Loading countries...</div>
      } @else if (error()) {
        <div class="error">{{ error() }}</div>
      } @else {
        <div class="countries-grid">
          @for (country of filteredCountries(); track country.idd) {
            <div class="country-card">
              <img
                [src]="country.flags.svg"
                [alt]="'Flag of ' + country.name.official"
                class="country-flag"
              />
              <div class="country-info">
                <p>{{ country.name.official }}</p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .subtitle {
      color: #666;
      margin-bottom: 2rem;
    }

    .search-container {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .search-input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }

    .stats {
      display: flex;
      gap: 2rem;
      color: #666;
      font-size: 0.9rem;
    }

    .loading, .error {
      text-align: center;
      padding: 3rem;
      font-size: 1.2rem;
    }

    .error {
      color: #dc3545;
    }

    .countries-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .country-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .country-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  `]
})
export class Solution15Component {
  private readonly httpResourceService = inject(HttpResourceCountryService);

  protected readonly title = '🏆 15 - HttpResource Signal-Based Architecture';
  protected readonly searchTerm = signal('');

  // Get httpResource signals directly
  private readonly countriesData = this.httpResourceService.getAllCountries();

  // Computed signals for derived state
  protected readonly countries = computed(() => this.countriesData.data() || []);
  protected readonly isLoading = computed(() => this.countriesData.isLoading());
  protected readonly error = computed(() => this.countriesData.error());

  protected readonly filteredCountries = computed(() => {
    const countries = this.countries();
    const search = this.searchTerm().toLowerCase();

    if (!search) return countries;

    return countries.filter((country: Country) =>
      country.name.official.toLowerCase().includes(search)
    );
  });

  constructor() {
    // Trigger the initial load by accessing the resource in constructor
    this.countriesData.data();
  }
}
