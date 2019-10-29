import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from './message.model';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { scan, map, filter, publishReplay, refCount } from 'rxjs/operators';

const initialMessages: Message[] = [];

type IMessagesOperation = (messages: Message[]) => Message[];

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  messages: Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
  update: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Message> = new Subject<Message>();

  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.update
    // watch the updates and accumulate operations on the messages
    .pipe(scan((messages: Message[],
                operation: IMessagesOperation) => {
        return operation(messages);
      },
      initialMessages),
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      publishReplay(1),
      refCount());

    this.create
      .pipe(map( (message: Message): IMessagesOperation => {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      }))
      .subscribe(this.update);

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead
        .pipe(map( (thread: Thread): IMessagesOperation => {
          return (messages: Message[]) => {
            return messages.map( (message: Message) => {
              if (message.thread.id === thread.id) {
                message.isRead = true;
              }
              return message;
            });
          };
        }))
        .subscribe(this.update);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messageForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .pipe(filter((message: Message) => {
        return (message.thread.id === thread.id) &&
            (message.author.id !== user.id);
      }));
  }
}

export const messagesServiceInjectables: Array<any> = [
  MessageService
];
