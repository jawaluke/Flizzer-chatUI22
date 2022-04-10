import { Injectable } from '@angular/core';

// Declare SockJS and Stomp
declare var SockJS: any;
declare var Stomp: { over: (arg0: any) => any; };


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  public connect() {
    let socket = new SockJS('https://flizzer-java-lakshmanan.herokuapp.com/user/chatSocket', { transports: ['websocket', 'polling', 'flashsocket'] });

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
