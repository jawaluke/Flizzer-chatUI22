import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatUserService } from 'src/app/services/chat-user.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  whichUserChatHome!: String;
  videoCallOnOrOff: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private chatUserService : ChatUserService) { }

  ngOnInit(): void {

    this.chatUserService.getSelectedUserRoom().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(room => {this.whichUserChatHome = room});
    this.chatUserService.videoCallComponentOnOrOff().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(data => {this.videoCallOnOrOff = data;});
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
