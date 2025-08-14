import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>{{ title }}</h1>
    
    <nav>
      <a routerLink="/solution1">🔴 Solution 1 </a> /
      <a routerLink="/solution2">🔴 Solution 2 </a> /
      <a routerLink="/solution3">🟡 Solution 3 </a> /
      <a routerLink="/solution4">🟡 Solution 4 </a> /
      <a routerLink="/solution5">🟡 Solution 5 </a> /
      <a routerLink="/solution6">🟡 Solution 6 </a> /
      <a routerLink="/solution7">🟡 Solution 7 </a> /
      <a routerLink="/solution8">🟡 Solution 8 </a> /
      <a routerLink="/solution9">🟡 Solution 9 </a> /
      <a routerLink="/solution10">🟡 Solution 10 </a> /
      <a routerLink="/solution11">🟡 Solution 11 </a> /
      <a routerLink="/solution12">🟢 Solution 12 </a> /
      <a routerLink="/solution13">🟢 Solution 13 </a> /
      <a routerLink="/solution14">🏆 Solution 14 </a>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      margin: 1rem 0;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }
    nav a {
      font-size: 1.2rem;
      margin: 0 0.5rem;
      text-decoration: none;
      color: #333;
    }
    nav a:hover {
      color: #007bff;
    }
  `]
})
export class AppComponent {
  title = '🏆🏁 Angular Signal Power: Angular Forms, Search & Filter Performance Lab';
}

