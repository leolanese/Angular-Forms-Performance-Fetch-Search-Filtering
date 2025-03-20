import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SearchService } from '../../services/jsonplaceholder.service';
import { FilterInputComponent } from "../solution11/Filter-input.component";
import { ListComponent } from "../solution11/List.component";
import { PaginationComponent } from "../solution11/pagination.component";
import { SortDropdownComponent } from "../solution11/sort-dropdown.component";

@Component({
    selector: 'app-solution12',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FilterInputComponent,
        ListComponent,
        PaginationComponent,
        SortDropdownComponent
    ],
    template: `
    <h3>{{ title }}</h3>
    <div class="container">
      <form [formGroup]="form">
        <!-- Filter Input -->
        <app-filter-input [filterControl]="filterControl"></app-filter-input>

        <!-- Sort Dropdown -->
        <app-sort-dropdown (sortChanged)="updateSort($event)"></app-sort-dropdown>

        <!-- List -->
        <app-list [countries]="filteredCountries()"></app-list>
        <p>Total found: {{ totalCount() }}</p>

        <!-- Pagination -->
        <app-pagination
          [currentPage]="currentPage()"
          [totalPages]="totalPages()"
          (pageChange)="updatePage($event)">
        </app-pagination>

      </form>
    </div>
  `
})
export class Solution12Component {
  title = '12 - Signal-based Component Driven Architecture (Search, Filter, Sort, Pagination)';
  
  private injector = inject(Injector);
  private searchService = inject(SearchService);
  private fb = inject(FormBuilder);

  // Form setup
  form: FormGroup;
  filterControl: FormControl;

  // Configuration
  private pageSize = 3;

  // Base signals
  private sortDirection = signal<'asc' | 'desc'>('asc');
  private currentPageIndex = signal<number>(0);
  private rawData: Signal<any[]>;
  private filterText: Signal<string>;

  // Computed signals
  filteredCountries: Signal<any[]>;
  currentPage: Signal<number>;
  totalPages: Signal<number>;
  totalCount: Signal<number>;

  constructor() {
    // Initialise form first
    this.form = this.fb.group({
      filter: ['']
    });
    this.filterControl = this.form.get('filter') as FormControl;

    // Then initialise signals that depend on filterControl
    this.rawData = toSignal(
      this.searchService.getData() ?? of([]),
      { injector: this.injector, initialValue: [] }
    );
    
    this.filterText = toSignal(
      this.filterControl.valueChanges ?? of(''),
      { injector: this.injector, initialValue: '' }
    );

    // Initialize computed signals
    const filteredData = computed(() => {
      const data = this.rawData();
      const filter = this.filterText()?.toLowerCase() ?? '';
      const direction = this.sortDirection();

      let result = data.filter(item => 
        item.name.toLowerCase().includes(filter)
      );

      result = result.sort((a, b) => 
        direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );

      return result;
    });

    this.totalCount = computed(() => filteredData().length);

    this.totalPages = computed(() => 
      Math.ceil(filteredData().length / this.pageSize)
    );

    this.currentPage = computed(() => this.currentPageIndex());

    this.filteredCountries = computed(() => {
      const start = this.currentPageIndex() * this.pageSize;
      return filteredData().slice(start, start + this.pageSize);
    });

    // Effect for logging/debugging
    effect(() => {
      console.log('Filter changed:', this.filterText());
      console.log('Current page:', this.currentPage());
      console.log('Total results:', this.totalCount());
    });
  }

  updateSort(direction: 'asc' | 'desc'): void {
    this.sortDirection.set(direction);
    this.currentPageIndex.set(0);
  }

  updatePage(newPage: number): void {
    this.currentPageIndex.set(newPage);
  }
}
