import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-signal-sort',
  standalone: true,
  template: `
    <div class="sort-container">
      <select
        [value]="direction"
        (change)="onDirectionChange($event)">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  `,
  imports: [CommonModule],
  styles: [`
    .sort-container {
      margin: 1rem 0;
    }
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class SignalSortComponent {
  @Input({ required: true }) direction: 'asc' | 'desc' = 'asc';
  @Output() directionChange = new EventEmitter<'asc' | 'desc'>();

  onDirectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as 'asc' | 'desc';
    this.directionChange.emit(value);
  }
} 