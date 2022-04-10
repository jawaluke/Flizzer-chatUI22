import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatUserService } from 'src/app/services/chat-user.service';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ChatMessage } from 'src/app/MessageObjects/ChatMessage';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.scss']
})
export class ChatRoomMessageComponent implements OnInit, OnDestroy {

  userName: any;
  whichUserRoom: any;
  userMessage!:ChatMessage[];
  notifications: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private chatUserService : ChatUserService, 
    private webSocketService: WebsocketService,
    private route: Router) { }

  ngOnInit(): void {

    this.userMessage = [];
    this.chatUserService.getUSerName().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {this.userName = user; });

    // GETTING THE SELECTED USER ROOM
    this.chatUserService.getSelectedUserRoom().pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$)).subscribe(
      room => {
                this.whichUserRoom = room;
                console.log("message user room changed");
                this.getMessageBasedOnUserRoom();
              }
    )
    

    this.listenForNotify();
    this.postMessageSignal();
  }



  // GET MESSAGE OF PARTICULAR USER ROOM
  getMessageBasedOnUserRoom() {
            // GETTING MESSAGES
    this.chatUserService.getUserRecords(this.userName).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      userRecords => {
        userRecords.userMessagesResponses.forEach(
          message => { 
                      if(message.chatUser.userName == this.whichUserRoom.userName) {
                          this.userMessage = message.chatMessageList;
                        }
                    }
        ) 
        console.log("User Message : ",this.userMessage);
      })

  }


  // GET NOTIFICATION FROM WEB Socket

  listenForNotify() {
    // Open connection with server socket
    let stompClient = this.webSocketService.connect();

    stompClient.connect({username: this.userName}, (frame: any) => {

  // Subscribe to notification topicSS
        stompClient.subscribe('/topic/'+this.userName+'/queue/messagesNotify', (noti: any) => {

           console.log("Received message from server...")
           // Update notifications attribute with the recent messsage sent from the server
            this.notifications = JSON.parse(noti.body);
            console.log("changed notification : ",this.notifications);
            var notifUsername = noti.body.split(',')[0].split(":")[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            var notifMsg = noti.body.split(',')[2].split(":")[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            var notifSender = noti.body.split(',')[1].split(":")[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

            // AFTER NOTIFICATION SHOW THE MESSAGES
            this.getMessageBasedOnUserRoom();

        })
    })
  }


  // POST MESSAGE SIGNAL 
  postMessageSignal() {
    this.chatUserService.getPostMessageSignal().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(msg => {
      console.log("post message signal received");
      this.getMessageBasedOnUserRoom();
    })
  }

  // VIDEO CALL ACCEPT

  videoCallAccept(peerId: string) {
    console.log("accepted call");
    this.chatUserService.changeVideoCallSenderOrReceiver("receiver");
    this.chatUserService.changeVideoCallPeerId(peerId);
    this.chatUserService.changeVideoCallOnOrOff("On");

    this.route.navigate(['video']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
