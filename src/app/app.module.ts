import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageComponent } from './page/page.component';
import { WindowComponent } from './window/window.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { FromNowPipe } from './pipes/from-now.pipe';

import { MessageService } from './message/message.service';
import { ThreadService } from './thread/thread.service';
import { UserService } from './user/user.service';

@NgModule({
   declarations: [
      AppComponent,
      WindowComponent,
      NavBarComponent,
      PageComponent,
      ChatThreadsComponent,
      ChatThreadComponent,
      ChatMessageComponent,
      FromNowPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule
   ],
   providers: [
      MessageService, ThreadService, UserService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
