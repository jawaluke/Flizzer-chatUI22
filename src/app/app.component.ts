import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatUserService } from './services/chat-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userName: any;
  title = 'chatUI22';
  private unsubscribe$: Subject<any> = new Subject<any>();


  constructor(private chatUserService : ChatUserService) {
    
  }

  ngOnInit(): void {
    while(this.userName==null) {
      this.userName = prompt("Please enter your name", "");
    }
    console.log("The User : ",this.userName);
    this.chatUserService.changeUserName(this.userName);

    this.chatUserService.getUserRecords(this.userName).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      records =>{
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  


}