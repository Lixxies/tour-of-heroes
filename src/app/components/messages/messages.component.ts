import { Component } from '@angular/core';

import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  template: `
    <div *ngIf="messageService.messages.length">
        <h2>Messages</h2>

        <ul>
            <li *ngFor="let message of messageService.messages">{{ message }}</li>
        </ul>

        <button type="button" class="clear" (click)="messageService.clear()">Clear messages</button>
    <div>
  `,
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
    constructor(public messageService: MessageService) {}
}
