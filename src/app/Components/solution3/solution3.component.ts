import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { CountryService } from '../../services/country.service';

@Component({
    selector: 'app-solution3',
    standalone: true,
    imports: [CommonModule, FilterPipe, FormsModule, ReactiveFormsModule],
    template: `
   <h3>{{ title }}</h3>
   <div class="container">

      <form [formGroup]="filterForm">
        <input 
            [formControl]="searchFilterFormControl" 
            type="text"
            class="form-control"
            autocomplete="on" 
            placeholder="{{ title }}" />
      </form>
     
      <ul *ngFor="let country of countries$ | async | filter:searchFilterFormControl.value">
        <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
        <div class="d-flex align-items-center ms-3">
          <i class="fas fa-search me-2"></i>
          <p class="country-name mb-0">{{ country.name.official }}</p>
        </div>
      </ul>  
   </div>
  `
})

export class Solution3Component {
  title = '3- Pipe + Angular Reactive forms: formGroup, formControl (directly binding the FormControl instance) + takeUntilDestroyed()'

  searchFilterFormControl: FormControl = new FormControl('');
  searchFilter$!: Observable<string>;

  countries$: Observable<Country[]> = of([]);

  private destroyRef = inject(DestroyRef)
  private countryService = inject(CountryService);

  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>('', { nonNullable: true })
  });

  ngOnInit() {
    this.searchFilter$ = this.searchFilterFormControl.valueChanges.pipe(startWith(''));

    this.countries$ = this.searchFilter$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(
        (searchTerm: string) => this.countryService.searchCountries(searchTerm)
      ),
      takeUntilDestroyed(this.destroyRef)
    )
  }

}
