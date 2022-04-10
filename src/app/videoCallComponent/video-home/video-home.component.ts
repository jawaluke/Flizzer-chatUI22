import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
//import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { VideoService } from '../../videoCallService/video.service';
import { ChatUserService } from 'src/app/services/chat-user.service';

@Component({
  selector: 'app-video-home',
  templateUrl: './video-home.component.html',
  styleUrls: ['./video-home.component.scss']
})
export class VideoHomeComponent implements OnInit, OnDestroy {

  userName: any;
  whichUserRoom: any;
  whoAmI: any;
  buttonText!: string;
  remoteScreen: any;
  localScreen: any;


  public isCallStarted$: Observable<boolean>;
  private peerId: any;

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  constructor(public dialog: MatDialog, private callService: VideoService, private chatUserService: ChatUserService) {
    this.isCallStarted$ = this.callService.isCallStarted$;
    this.peerId = this.callService.initPeer();

    
  }
  
  ngOnInit():void {
    this.chatUserService.getUSerName().subscribe(user => {this.userName = user; });
    this.chatUserService.getSelectedUserRoom().subscribe(user => {this.whichUserRoom = user})
    this.chatUserService.getVideoCallSenderOrReceiver().subscribe(callSender => {this.whoAmI = callSender});
    console.log("Inside Video init : ",this.whoAmI);
    this.remoteScreen = "big-screen";
    this.localScreen = "small-screen";
    
    this.callService.localStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.localVideo.nativeElement.srcObject = stream)
    this.callService.remoteStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream)

    if(this.whoAmI == "receiver") {
      this.chatUserService.getVideoCallPeerId().subscribe(callPeerId => {
        this.peerId = callPeerId;
      });
      this.buttonText = "Join";  
    }
    else{
      
      this.chatUserService.postMsgToUSer(this.userName, this.whichUserRoom.userName, this.peerId, "VIDEOCALL")
    .subscribe(stream => {
      console.log("Posted video call Offer");
    });
      this.buttonText = "Start";
    }
  }
  


  ngOnDestroy(): void {
    this.callService.destroyPeer();
  }

  // false
  public showModal(joinCall: boolean): void {
    
    if(this.whoAmI == "receiver") {
        console.log("Receiver Video Start..")
        of(this.callService.establishMediaCall(this.peerId)).subscribe(_  => { });
    }
    else {
        console.log("sender Video Start..");
        of(this.callService.enableCallAnswer()).subscribe(_  => { })
    }
    
  }

  changeScreenSize() {
    if(this.remoteScreen=="small-screen"){
      this.remoteScreen = "big-screen";
      this.localScreen = "small-screen";
    }
    else{
      this.remoteScreen = "small-screen";
      this.localScreen = "big-screen";
    }
  }

  public endCall() {
    this.chatUserService.changeVideoCallOnOrOff('Off');
    this.callService.closeMediaCall();
  }
}
