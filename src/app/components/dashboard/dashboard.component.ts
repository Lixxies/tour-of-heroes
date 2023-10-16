import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-heroes [renderAll]="false"></app-heroes>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    constructor() { }
}
