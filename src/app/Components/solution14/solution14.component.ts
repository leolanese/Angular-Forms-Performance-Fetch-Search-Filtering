import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country } from '../../Modules/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-solution14',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- 
-Solution 14: Pure Signal-Based Architecture with Real API (Search, Filter, Sort)
- Uses signal(), computed(), effect()
- Modern control flow (@if, @for)
- Component composition
- Pure signal-based state management
- No legacy FormBuilder/FormGroup
-->
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
export class Solution14Component {
  // Injected dependencies
  private readonly countryService = inject(CountryService);
  
  // Properties
  protected readonly title = '🏆 14 - Pure Signal-Based Architecture with Real API (Search, Filter, Sort)';
  protected readonly searchTerm = signal('');
  
  // Pure signal-based state
  protected readonly countries = signal<Country[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);
  
  // Computed signals for derived state
  protected readonly filteredCountries = computed(() => {
    const countries = this.countries();
    const search = this.searchTerm().toLowerCase();
    
    if (!search) return countries;
    
    return countries.filter((country: Country) => 
      country.name.official.toLowerCase().includes(search) ||
      (country.region && country.region.toLowerCase().includes(search))
    );
  });
  
  // Methods
  protected onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.searchCountries(value);
  }
  
  private searchCountries(term: string): void {
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
    this.initLogging();
    this.initDebouncedSearch();
  }
  
  private initLogging(): void {
    // Log search term changes (for debugging)
    effect(() => {
      console.log('Search term changed:', this.searchTerm());
    });
    
    // Log when countries data changes
    effect(() => {
      const countries = this.countries();
      console.log('Countries loaded:', countries.length);
    });
  }
  
  private initDebouncedSearch(): void {
    // Simple debouncing using setTimeout
    let timeoutId: number;
    
    effect(() => {
      const searchTerm = this.searchTerm();
      
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set new timeout for debounced search
      timeoutId = setTimeout(() => {
        console.log('Debounced search for:', searchTerm);
        this.searchCountries(searchTerm);
      }, 300);
    });
  }
}

// ❌ No legacy FormBuilder/FormGroup: Uses old reactive forms API
// ❌ Complex FormGroup/FormControl: Over-engineered for simple forms
// ❌ No Modern Patterns: Missing signals, model inputs, modern control flow
// ❌ Enterprise Focus: Focuses on "hireable" rather than "modern and efficient"
// ❌ template-driven forms
// ❌ Use OnInit lifecycle hooks
// ❌ No OnPush change detection



// 🏆 Modern Form Benefits
// ✅ Signal-Based: Reactive state management:  Uses signal(), computed(), effect()
// ✅ Schema-Driven: Configuration-based forms
// ✅ Real-Time Validation: Computed validation signals
// ✅ Modern Control Flow: @if, @for instead of *ngIf, *ngFor
// ✅ OnPush CD: Better performance
// ✅ Standalone: No NgModules needed
// ✅ Type-Safe: Full TypeScript support
