import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';
import { MessageService } from '../message/message.service';
import { ThreadService } from '../thread/thread.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public messageService: MessageService,
              public threadService: ThreadService,
              public userService: UserService,
              public el: ElementRef
    ) { }

  ngOnInit() {
    this.messages = this.threadService.currentThreadMessages;
    this.draftMessage = new Message();

    this.threadService.currentThread.subscribe(
      (thread: Thread) => this.currentThread = thread
    );

    this.userService.currentUser.subscribe(
      (user: User) => this.currentUser = user
    );

    this.messages.subscribe(
      (messages: Array<Message>) => {
        setTimeout( () => this.scrollTobottom);
      }
    );
  }

  sendMessage(): void {
    const message = this.draftMessage;
    message.author = this.currentUser;
    message.thread = this.currentThread;
    message.isRead = true;
    this.messageService.addMessage(message);
    this.draftMessage = new Message();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  scrollTobottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
