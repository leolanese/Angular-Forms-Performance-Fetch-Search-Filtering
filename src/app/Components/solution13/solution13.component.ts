import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { SignalCountryService } from '../../services/signal-country.service';
import { SignalFilterComponent } from './signal-filter.component';
import { SignalListComponent } from './signal-list.component';
import { SignalPaginationComponent } from './signal-pagination.component';
import { SignalSortComponent } from './signal-sort.component';

@Component({
  selector: 'app-solution13',
  standalone: true,
  imports: [
    CommonModule,
    SignalFilterComponent,
    SignalListComponent,
    SignalPaginationComponent,
    SignalSortComponent
  ],
  template: `
    <div class="container">
      <h2>Countries List</h2>
      
      @if (countryService.getCountries().isLoading()) {
        <div class="loading">Loading...</div>
      } @else if (countryService.getCountries().error()) {
        <div class="error">{{ countryService.getCountries().error() }}</div>
      } @else {
        <div class="controls">
          <app-signal-filter [(filterValue)]="filterText" />
          <app-signal-sort [(direction)]="sortDirection" />
        </div>

        <app-signal-list [countries]="visibleCountries()" />

        <app-signal-pagination
          [(currentPage)]="currentPage"
          [totalPages]="totalPages()"
        />
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }
    .controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .loading, .error {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
    }
    .error {
      color: #dc3545;
    }
  `]
})
export class Solution13Component {
  filterText = signal('');
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal(0);
  itemsPerPage = 10;

  constructor(public countryService: SignalCountryService) {
    this.countryService.fetchCountries();

    effect(() => {
      // Reset page when filter or sort changes
      this.currentPage.set(0);
    }, { allowSignalWrites: true });

    // Log when data is loaded
    effect(() => {
      const countries = this.countryService.getCountries().data();
      console.log('Loaded countries:', countries);
    });

    // Log when filter changes
    effect(() => {
      console.log('Filter text:', this.filterText());
      console.log('Filtered countries:', this.filteredCountries());
    });
  }

  filteredCountries = computed(() => {
    const countries = this.countryService.getCountries().data();
    const filter = this.filterText().toLowerCase();
    
    if (!filter) return countries;
    
    return countries.filter(country => 
      country.name.toLowerCase().includes(filter)
    );
  });

  sortedCountries = computed(() => {
    const countries = this.filteredCountries();
    return [...countries].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return this.sortDirection() === 'asc' ? comparison : -comparison;
    });
  });

  totalCount = computed(() => this.sortedCountries().length);
  totalPages = computed(() => Math.ceil(this.totalCount() / this.itemsPerPage));

  visibleCountries = computed(() => {
    const start = this.currentPage() * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.sortedCountries().slice(start, end);
  });
}