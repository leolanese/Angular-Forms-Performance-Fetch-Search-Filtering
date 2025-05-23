import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signal-filter',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="filter-container">
      <input
        type="text"
        [ngModel]="filterValue()"
        (ngModelChange)="onFilterChange($event)"
        placeholder="Search countries..."
        class="filter-input"
      />
    </div>
  `,
    styles: [`
    .filter-container {
      flex: 1;
    }
    .filter-input {
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }
    .filter-input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }
  `]
})
export class SignalFilterComponent {
  filterValue = model.required<string>();

  onFilterChange(value: string) {
    console.log('Filter value changed:', value);
    this.filterValue.set(value);
  }
} 