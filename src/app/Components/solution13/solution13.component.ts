import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <h3>{{ title }}</h3>
        
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
  `,
    styles: [`
      .controls {
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
  title = '13 - Signal-based state management with component composition for search, filtering, sorting, and pagination functionality';
  
  filterText = signal('');
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal(0);
  itemsPerPage = 10;

  constructor(public countryService: SignalCountryService) {
    // Reset page when filter or sort changes
    effect(() => {
      this.filterText();
      this.sortDirection();
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
    const countries = this.countryService.getCountries().data() ?? [];
    const filter = this.filterText().toLowerCase();
    
    if (!filter) return countries;
    
    return countries.filter(country => 
      country.name.common.toLowerCase().includes(filter)
    );
  });

  sortedCountries = computed(() => {
    const countries = this.filteredCountries() ?? [];
    return [...countries].sort((a, b) => {
      const nameA = String(a.name.common).toLowerCase();
      const nameB = String(b.name.common).toLowerCase();
      const comparison = nameA.localeCompare(nameB);
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