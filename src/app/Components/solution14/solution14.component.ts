import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Country } from '../../Modules/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-solution14',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>🏆 Solution 14: Angular 20+ Modern Patterns</h2>
      <p class="subtitle">Signals + Model Inputs + Functional Guards + Modern Control Flow</p>
      
      <div class="search-container">
        <input
          type="text"
          [ngModel]="searchTerm()"
          (ngModelChange)="onSearchChange($event)"
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
                <h3>{{ country.name.official }}</h3>
                <p>{{ country.region }}</p>
                <p>Population: {{ country.population | number }}</p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
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
    
    .country-flag {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    
    .country-info {
      padding: 1rem;
    }
    
    .country-info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }
    
    .country-info p {
      margin: 0.25rem 0;
      color: #666;
    }
  `]
})
export class Solution14Component {
  // Modern signal-based search term
  searchTerm = signal('');
  
  // Service injection using inject() function
  private countryService = inject(CountryService);
  
  // Countries data as signal
  countries = signal<Country[]>([]);
  
  // Computed signals for derived state
  filteredCountries = computed(() => {
    const countries = this.countries();
    const search = this.searchTerm().toLowerCase();
    
    if (!search) return countries;
    
    return countries.filter((country: Country) => 
      country.name.official.toLowerCase().includes(search) ||
      country.region.toLowerCase().includes(search)
    );
  });
  
  // Loading and error states as signals
  isLoading = signal(false);
  error = signal<string | null>(null);
  
  onSearchChange(value: string) {
    this.searchTerm.set(value);
    this.searchCountries(value);
  }
  
  private searchCountries(term: string) {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.countryService.searchCountries(term).subscribe({
      next: (countries) => {
        this.countries.set(countries);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      }
    });
  }
  
  constructor() {
    // Effect to log search changes
    effect(() => {
      console.log('Search term:', this.searchTerm());
    });
    
    // Initial search
    this.searchCountries('');
  }
}
