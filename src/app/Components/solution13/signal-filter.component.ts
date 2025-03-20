import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal-filter',
  standalone: true,
  template: `
    <div class="filter-container">
      <input
        type="text"
        [ngModel]="filterValue()"
        (ngModelChange)="filterValue.set($event)"
        placeholder="Filter countries..."
      />
    </div>
  `,
  imports: [CommonModule, FormsModule],
  styles: [`
    .filter-container {
      margin: 1rem 0;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class SignalFilterComponent {
  filterValue = model.required<string>();
} 