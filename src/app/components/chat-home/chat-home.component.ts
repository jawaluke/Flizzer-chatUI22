import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ChatUserService } from 'src/app/services/chat-user.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent implements OnInit, OnDestroy {


  userName!: String;
  videoCallOnOrOff!: String;
  exit!: boolean;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private chatuserService: ChatUserService) { 
    this.videoCallOnOrOff = "Off"

  }

  ngOnInit(): void {

    this.chatuserService.getUSerName().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {this.userName = user; });
    this.chatuserService.videoCallComponentOnOrOff().subscribe(data => {this.videoCallOnOrOff = data;});
  
  }


  ngOnDestroy() {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }



}
