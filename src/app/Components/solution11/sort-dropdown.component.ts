import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-sort-dropdown',
    standalone: true,
    imports: [CommonModule],
    template: `
    <select (change)="onSortChange($event)">
      <option value="asc">Sort Ascending</option>
      <option value="desc">Sort Descending</option>
    </select>
  `
})
export class SortDropdownComponent {
  @Output() sortChanged = new EventEmitter<'asc' | 'desc'>(); // Emit sort order changes

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortChanged.emit(target.value as 'asc' | 'desc'); // Emit the selected sort order
  }
}
