import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
    selector: 'app-signal-pagination',
    template: `
    <div class="pagination-container">
      <button 
        (click)="onPageChange(currentPage() - 1)"
        [disabled]="currentPage() === 0"
        class="pagination-button">
        Previous
      </button>
      
      <span class="page-info">
        Page {{ currentPage() + 1 }} of {{ totalPages() }}
      </span>
      
      <button 
        (click)="onPageChange(currentPage() + 1)"
        [disabled]="currentPage() >= totalPages() - 1"
        class="pagination-button">
        Next
      </button>
    </div>
  `,
    imports: [CommonModule],
    styles: [`
    .pagination-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 1rem 0;
    }
    .pagination-button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      cursor: pointer;
      transition: all 0.2s;
    }
    .pagination-button:hover:not(:disabled) {
      background-color: #f8f9fa;
      border-color: #007bff;
    }
    .pagination-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .page-info {
      color: #666;
    }
  `]
})
export class SignalPaginationComponent {
  currentPage = model.required<number>();
  totalPages = input.required<number>();

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.currentPage.set(page);
    }
  }
} 