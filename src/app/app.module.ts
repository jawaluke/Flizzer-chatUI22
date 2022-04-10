import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatHomeComponent } from './components/chat-home/chat-home.component';


// ----------------------- Prime NG --------------------------------------------
import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


import { HttpClientModule } from '@angular/common/http';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatUserService } from './services/chat-user.service';
import { ChatRoomHeaderComponent } from './components/chat-room-header/chat-room-header.component';
import { ChatRoomMessageComponent } from './components/chat-room-message/chat-room-message.component';
import { ChatRoomKeyboardComponent } from './components/chat-room-keyboard/chat-room-keyboard.component';
import { DialogComponent } from './videoCallComponent/dialog/dialog.component';
import { VideoHomeComponent } from './videoCallComponent/video-home/video-home.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WebsocketService } from './services/websocket.service';


@NgModule({
  declarations: [
    AppComponent,
    ChatHomeComponent,
    ChatListComponent,
    ChatRoomComponent,
    ChatRoomHeaderComponent,
    ChatRoomMessageComponent,
    ChatRoomKeyboardComponent,
    DialogComponent,
    VideoHomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ListboxModule,
    FormsModule,
    InputTextModule,
    PickerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  providers: [ChatUserService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
