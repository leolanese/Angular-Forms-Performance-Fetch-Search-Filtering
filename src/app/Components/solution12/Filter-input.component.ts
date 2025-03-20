import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-signal-filter',
  standalone: true,
  template: `
    <input 
      [value]="filterValue()"
      (input)="onFilterChange($event)"
      class="form-control" 
      type="text" 
      placeholder="Search..." />
  `
})
export class SignalFilterComponent {
  filterValue = input<string>('');
  filterChange = output<string>();

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterChange.emit(value);
  }
}
