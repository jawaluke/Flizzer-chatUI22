import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ChatUserService } from 'src/app/services/chat-user.service';

@Component({
  selector: 'app-chat-room-header',
  templateUrl: './chat-room-header.component.html',
  styleUrls: ['./chat-room-header.component.scss']
})
export class ChatRoomHeaderComponent implements OnInit, OnDestroy {

  service: any;
  whichUserRoom: any;
  private unsubscribe$: Subject<any> = new Subject<any>();


  
  constructor(private chatUserService : ChatUserService, private route: Router) { }

  ngOnInit(): void {
    this.service = this.chatUserService;
    // GETTING THE SELECTED USER ROOM
    this.chatUserService.getSelectedUserRoom().pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$)).subscribe(
      room => {
                this.whichUserRoom = room;
              }
    )
    

  }


  routeToVideoComponent() {
    console.log("navigate to video component");
    this.chatUserService.changeVideoCallOnOrOff("On");
    this.route.navigate(['video']);
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



}
