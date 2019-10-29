import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ThreadService } from '../thread/thread.service';
import { MessageService } from '../message/message.service';
import { Thread } from '../thread/thread.model';
import { combineLatest } from 'rxjs/operators';
import { Message } from '../message/message.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  unreadMessagesCount: number;

  constructor(public messageService: MessageService,
              public threadService: ThreadService) { }

  ngOnInit(): void {
    this.messageService.messages
      .pipe(
        combineLatest(
          this.threadService.currentThread,
          (message: Message[], currentThread: Thread) =>
            [currentThread, message]
        )
      )
      .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
        _.reduce(
          messages, (sum: number, message: Message) => {
            const messageIsInCurrentThread: boolean = message.thread
              && currentThread &&
              (currentThread.id === message.thread.id);
            if (message && !message.isRead && !messageIsInCurrentThread) {
                  sum = sum + 1;
              }
            return sum;
          },
        0);
      });
  }

}
