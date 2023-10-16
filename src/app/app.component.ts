import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main>
        <header>
            <h1>{{ title }}</h1>
        </header>

        <nav class="topNav">
            <a routerLink="/dashboard" class="navItem">Dashboard</a>
            <a routerLink="/heroes" class="navItem">Heroes</a>
        </nav>

        <router-outlet></router-outlet>
        <app-hero-search></app-hero-search>
        <app-messages></app-messages>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
