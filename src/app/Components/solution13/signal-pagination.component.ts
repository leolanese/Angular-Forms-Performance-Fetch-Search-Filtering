import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-signal-pagination',
  standalone: true,
  template: `
    <div class="pagination-container">
      <button
        [disabled]="currentPage() === 0"
        (click)="onPageChange(currentPage() - 1)">
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage() + 1 }} of {{ totalPages() }}
      </span>
      <button
        [disabled]="currentPage() === totalPages() - 1"
        (click)="onPageChange(currentPage() + 1)">
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
    button {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .page-info {
      font-size: 0.9rem;
      color: #666;
    }
  `]
})
export class SignalPaginationComponent {
  currentPage = model.required<number>();
  totalPages = input.required<number>();

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
} 