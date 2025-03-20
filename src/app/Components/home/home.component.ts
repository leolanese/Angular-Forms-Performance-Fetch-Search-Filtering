import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        {{pageTitle}}
      </div>
    </div>
  `
})
export class HomeComponent {
  public pageTitle = 'Angular search & filters playground area';

}