/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThreadService } from './thread.service';
import { User } from '../user/user.model';
import { Thread } from './thread.model';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import * as _ from 'lodash';

describe('Service: Thread', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreadService]
    });
  });

  it('should collect the threads from Messages', () => {

    const nate: User = new User('Nate Murray', '');
    const filipe: User = new User('Filipe Lobos', '');

    const t1: Thread = new Thread('t1', 'Thread 1', '');
    const t2: Thread = new Thread('t2', 'Thread 2', '');

    const m1: Message = new Message({
      author: nate,
      text: 'Hi',
      thread: t1
    });

    const m2: Message = new Message({
      author: filipe,
      text: 'Where did you get that?',
      thread: t1
    });

    const m3: Message = new Message({
      author: nate,
      text: 'Who be da bossu',
      thread: t2
    });

    const messageService: MessageService = new MessageService();
    const threadService: ThreadService = new ThreadService(messageService);

    threadService.threads
      .subscribe((threadIdx: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadIdx);
        const threadNames: string = _.map(
          threads, (t: Thread) => t.name
        ).join(', ');

        console.log(`=> threads (${threads.length}): ${threadNames}`);
        // console.log(thre)
      });

    messageService.addMessage(m1);
    messageService.addMessage(m2);
    messageService.addMessage(m3);
  });
});
