import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatUserService } from 'src/app/services/chat-user.service';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ChatRoomMessageComponent } from '../chat-room-message/chat-room-message.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-room-keyboard',
  templateUrl: './chat-room-keyboard.component.html',
  styleUrls: ['./chat-room-keyboard.component.scss']
})
export class ChatRoomKeyboardComponent implements OnInit, OnDestroy {

  userName: any;
  typedUserMessage!: string;
  whichUserRoom: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private chatUserService : ChatUserService) { 

    }

  ngOnInit(): void {
    this.typedUserMessage = "";
    this.chatUserService.getUSerName().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {this.userName = user; });
    // GETTING THE SELECTED USER ROOM
    this.chatUserService.getSelectedUserRoom().pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$)).subscribe(room => {this.whichUserRoom = room})
  }


  sendUserTypedMessage() {
    if(this.typedUserMessage!="") {
      console.log("User typed message : ", this.typedUserMessage);
      this.chatUserService.postMsgToUSer(this.userName, this.whichUserRoom.userName, this.typedUserMessage, "NONE" ).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(msg => {});
      console.log("message Posted");

      // CALLING ANOTHER COMPONENT TO LOAD MESSAGES..
      this.chatUserService.changePostMessageSignal("new message");
      
    }
    this.typedUserMessage = "";
  }


  public isEmojiPickerVisible!: boolean;

  public addEmoji(event: { emoji: { native: any; }; }) {
      this.typedUserMessage = `${this.typedUserMessage}${event.emoji.native}`;
      this.isEmojiPickerVisible = false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
