/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageService } from './message.service';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Message } from './message.model';

describe('Service: Message', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should test', () => {

    const user: User = new User('Nate', '');
    const thread: Thread = new Thread('t1', 'Nate', '');

    const m1: Message = new Message({
      author: user,
      text: 'Hi',
      thread
    });

    const m2: Message = new Message({
      author: user,
      text: 'Bye',
      thread
    });

    const messageService: MessageService = new MessageService();

    // listen to each message indivdually as it comes in
    messageService.newMessages
      .subscribe((message: Message) => {
        console.log('=> newMessages: ', message.text);
      });

    // listen to the stream of most current messages
    messageService.messages
      .subscribe((message: Message[]) => {
        console.log('=> messages', message.length);
      });

    messageService.create
      .subscribe((message: Message) => {
        console.log('=> message created: ', message.text);
      });

    messageService.addMessage(m1);
    // messageService.addMessage(m2);

  });
});
