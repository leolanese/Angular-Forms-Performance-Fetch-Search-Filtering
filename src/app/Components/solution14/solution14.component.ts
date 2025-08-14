import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Country } from '../../Modules/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-solution14',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h3>{{ title }}</h3>
    <div class="container">
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
  title = '🏆 14 - Features including signals, model inputs, native control flow (@if, @for), and modern reactive patterns';

  // Modern signal-based search term
  searchTerm = signal('');
  
  // Service injection using inject() function
  private countryService = inject(CountryService);
  
  // Debounced search subject to prevent excessive API calls
  private searchSubject = new Subject<string>();
  
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
    effect(() => {
      console.log('Search term:', this.searchTerm());
    });
    
    this.searchCountries('');
  }
}
