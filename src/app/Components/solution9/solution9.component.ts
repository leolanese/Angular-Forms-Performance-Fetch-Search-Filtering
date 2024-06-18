import { Component, computed, DestroyRef, effect, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { CountryService } from '../../services/country.service';
import { OptionComponent } from "../solution8/option.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-solution9',
    standalone: true,
    template: `
    <h3>{{ title }}</h3>

    <div class="container">
        <form>
          <input 
              [(ngModel)]="countrySearchSignal"
              name="userName" 

              class="form-control" 
              type="text" 
              autocomplete="on" 
              placeholder="{{ title }}"
              aria-label="search" 
              required />
           
              <button (click)="onSearch()">Search</button>   
        <ul> 
          @for(country of countries$ | async | filter: countrySearchSignal(); track country.idd){
            <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
            <div class="d-flex align-items-center ms-3">
              <i class="fas fa-search me-2"></i>
              <p class="country-name mb-0">{{ country.name.official }}</p>
            </div>
          }
        </ul> 
      </form>

    </div>
    
  `,
    imports: [CommonModule,
              ReactiveFormsModule,
              FormsModule, FilterPipe, OptionComponent]
})
export class Solution9Component {
    title = '9- Pipe + Signal + 2-way-binding[()] + onSearch event';
    countrySearchSignal = signal("");

    private countryService = inject(CountryService);
    private destroyRef = inject(DestroyRef);

    countries$: Observable<Country[]> = of([]);
    searchFilter$!: Observable<string> 

    onSearch(): void {
      this.countries$ = of(this.countrySearchSignal()).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => this.countryService.searchCountries(searchTerm)),
        takeUntilDestroyed(this.destroyRef)
      )

      console.log("Search:", this.countrySearchSignal());
    }  
}
