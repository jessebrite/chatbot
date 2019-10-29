import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { ThreadService } from './thread/thread.service';
import { UserService } from './user/user.service';
import { ChatExampleData } from './data/chat-example';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatbot';

  constructor( public messageService: MessageService,
               public threadservice: ThreadService,
               public userService: UserService

  ) {
    ChatExampleData.init(messageService, threadservice, userService);
  }
}
