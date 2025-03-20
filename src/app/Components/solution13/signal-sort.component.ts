import { CommonModule } from '@angular/common';
import { Component, model, output } from '@angular/core';

@Component({
  selector: 'app-signal-sort',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sort-container">
      <select
        [value]="direction()"
        (change)="onDirectionChange($event)"
        class="sort-select"
      >
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
    </div>
  `,
  styles: [`
    .sort-container {
      min-width: 150px;
    }
    .sort-select {
      width: 100%;
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      background-color: white;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .sort-select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }
  `]
})
export class SignalSortComponent {
  direction = model.required<'asc' | 'desc'>();
  directionChange = output<'asc' | 'desc'>();

  onDirectionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'asc' | 'desc';
    this.direction.set(value);
    this.directionChange.emit(value);
  }
} 