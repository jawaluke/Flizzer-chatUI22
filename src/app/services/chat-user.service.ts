import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ChatUserRecords } from '../MessageObjects/ChatUserRecords';
import { ChatMessage } from 'src/app/MessageObjects/ChatMessage';


@Injectable({
  providedIn: 'root'
})
export class ChatUserService {


  userName : BehaviorSubject<String>;
  whichUserRoom : BehaviorSubject<String>;
  videoCall : BehaviorSubject<String>;

  postMessageSignal: BehaviorSubject<string>;

  videoCallSenderOrReceiver: BehaviorSubject<string>;
  videoCallPeerId: BehaviorSubject<string>;



  constructor(private http: HttpClient ) { 
    this.whichUserRoom = new BehaviorSubject<String>("Default");
    this.videoCall = new BehaviorSubject<String>("off");
    this.userName = new BehaviorSubject<String>("none");
    this.postMessageSignal = new BehaviorSubject<string>("old message");
    this.videoCallSenderOrReceiver = new BehaviorSubject<string>("None");
    this.videoCallPeerId = new BehaviorSubject<string>("none");
  }

  //    <--------------------- USER NAME ----------------->
  getUSerName() {
    return this.userName;
  }

  changeUserName(newUserName: string) {
    this.userName.next(newUserName);
  }

  //    <---------------------- USER ROOM ----------------->
  getSelectedUserRoom() {
    return this.whichUserRoom;
  }

  changeSelectedUserRoom(userRoom: string) {
    this.whichUserRoom.next(userRoom);
  }

  // <---------------------- USER POSTING MESSAGE SIGNAL---------------->
  getPostMessageSignal() {
    return this.postMessageSignal;
  }

  changePostMessageSignal(postMessage: string) {
    this.postMessageSignal.next(postMessage);
  }

  // <----------------------- VIDEO CALL SENDER OR RECEIVER -------------------->
  getVideoCallSenderOrReceiver() {
    return this.videoCallSenderOrReceiver;
  }

  changeVideoCallSenderOrReceiver(user: string) {
    this.videoCallSenderOrReceiver.next(user);
  }

  // <------------------------- VIDEO CALL PEER ID ------------------------------->
  getVideoCallPeerId() {
    return this.videoCallPeerId;
  }

  changeVideoCallPeerId(newPeerId: string) {
    this.videoCallPeerId.next(newPeerId);
  }

  populateUserChatList() {
    var user = ["jade", "andy", "roundup bud", "jesse", "sam", "james", "bond", "bob", "ghina", "jim", "yuva", "sigh", "khana", "genesis","ghina", "jim", "yuva", "sigh", "khana", "genesis","ghina", "jim", "yuva", "sigh", "khana", "genesis"];
    return user;
  }


  videoCallComponentOnOrOff() {
    return this.videoCall;
  }

  changeVideoCallOnOrOff(condition: string) {
    this.videoCall.next(condition);
  }

  // Chat User Backend

  //url = "http://localhost:8080/user";
  //url = "http://192.168.0.103:8080/user";
  url = "https://flizzer-java-lakshmanan.herokuapp.com/user";

  checkUserExists(userName: string) {
    return this.http.get<boolean>(this.url+"/userExist/"+userName);
  }

  getUserRecords(userName: string) :Observable<ChatUserRecords> {
    return this.http.get<ChatUserRecords>(this.url+"/"+userName+"/records")
  }

  postMsgToUSer(sender: string, receiver: string, msg: string, msgTag: string)  {

    const headers = { 'content-type': 'application/json'}  

      // TIMESTAMP
      var today = new Date();
      var pipe = new DatePipe('en-US');
      var todayWithPipe = pipe.transform(Date.now(), 'MMM d, y, h:mm:ss a');
      
      const chatMessage: ChatMessage = {
        chatId: 0,
        sender: sender,
        receiver: receiver,
        message: msg,
        messageTag: msgTag,
        times: todayWithPipe?.toString()
      }
    
    const body=JSON.stringify(chatMessage);
      
    return this.http.post(this.url+"/message/send/",body,{'headers': headers});
  }


}
