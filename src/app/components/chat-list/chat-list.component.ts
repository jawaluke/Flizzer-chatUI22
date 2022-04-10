import { Component, OnDestroy, OnInit } from '@angular/core';

import { PrimeNGConfig, SelectItemGroup } from "primeng/api";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatUser } from 'src/app/MessageObjects/ChatUser';
import { ChatUserService } from 'src/app/services/chat-user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit,OnDestroy {

  userName: any;
  userList!: ChatUser[];
  selectedUser: any;
  private unsubscribe$: Subject<any> = new Subject<any>();  


  constructor(private chatUserService : ChatUserService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.chatUserService.getUSerName().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {this.userName = user; });
    //this.userList = this.chatUserService.populateUserChatList();

    this.chatUserService.getUserRecords(this.userName).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (user) => {
        this.userList = user.chatUsers;
        console.log(this.userList);
      }
    )

    console.log("userlist: ",this.userList);
  }


  whichUser()  {
    console.log("User List Selected Room : ",this.selectedUser);
    // SAY SELECTED USER ROOM TO THE WORLD..
    this.chatUserService.changeSelectedUserRoom(this.selectedUser);
  }


  ngOnDestroy() {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

}
