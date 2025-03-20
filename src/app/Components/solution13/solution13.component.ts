import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SignalCountryService } from '../../services/signal-country.service';
import { SignalFilterComponent } from './signal-filter.component';
import { SignalListComponent } from './signal-list.component';
import { SignalPaginationComponent } from './signal-pagination.component';
import { SignalSortComponent } from './signal-sort.component';

@Component({
  selector: 'app-solution13',
  standalone: true,
  template: `
    <h3>{{ title }}</h3>
    <div class="container">
      @if (countryService.getCountries().isLoading()) {
        <div>Loading...</div>
      } @else if (countryService.getCountries().error()) {
        <div class="error">{{ countryService.getCountries().error() }}</div>
      } @else {
        <app-signal-filter
          [(filterValue)]="state().filter">
        </app-signal-filter>

        <app-signal-sort
          [(direction)]="state().sort">
        </app-signal-sort>

        <app-signal-list [countries]="visibleCountries()"/>

        <app-signal-pagination
          [(currentPage)]="state().page"
          [totalPages]="totalPages()">
        </app-signal-pagination>

        <p>Total found: {{ totalCount() }}</p>
      }
    </div>
  `,
  imports: [
    CommonModule,
    SignalFilterComponent,
    SignalSortComponent,
    SignalListComponent,
    SignalPaginationComponent
  ]
})
export class Solution13Component {
  title = '13 - Pure Signal Architecture';
  
  countryService = inject(SignalCountryService);
  
  // State management using signals
  state = signal({
    filter: '',
    sort: 'asc' as 'asc' | 'desc',
    page: 0,
    pageSize: 3
  });

  // Computed signals for derived state
  filterText = computed(() => this.state().filter);
  sortDirection = computed(() => this.state().sort);
  currentPageIndex = computed(() => this.state().page);
  pageSize = computed(() => this.state().pageSize);

  // Computed signals for data transformation
  private filteredCountries = computed(() => {
    const countries = this.countryService.getCountries().data();
    const filter = this.filterText().toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(filter)
    );
  });

  private sortedCountries = computed(() => {
    const direction = this.sortDirection();
    return [...this.filteredCountries()].sort((a, b) => 
      direction === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  });

  totalCount = computed(() => this.filteredCountries().length);
  totalPages = computed(() => 
    Math.ceil(this.sortedCountries().length / this.pageSize())
  );

  visibleCountries = computed(() => {
    const start = this.currentPageIndex() * this.pageSize();
    return this.sortedCountries().slice(start, start + this.pageSize());
  });

  constructor() {
    this.loadCountries();
  }

  // Actions
  updateFilter(text: string) {
    this.state.update(state => ({
      ...state,
      filter: text,
      page: 0
    }));
  }

  updateSort(direction: 'asc' | 'desc') {
    this.state.update(state => ({
      ...state,
      sort: direction
    }));
  }

  updatePage(page: number) {
    this.state.update(state => ({
      ...state,
      page
    }));
  }

  private async loadCountries() {
    await this.countryService.fetchCountries();
  }
}