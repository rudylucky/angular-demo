import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})
export class TalkComponent implements OnInit {

  ws: WebSocket;

  constructor() { }

  ngOnInit() {
    this.connect()
  }

  connect = () => {
    this.ws != null && this.ws.close();
    this.ws = new WebSocket("ws://localhost:8081/talkWebSocket/rudy");
    this.ws.onopen = this.onopen;
    this.ws.onclose = this.onclose;
    this.ws.onerror = this.onerror;
    this.ws.onmessage = this.onmessage;
    console.log(this.ws);
  }

  sendMessage = () => {
    console.log('sending message');
    this.ws.send("haha")
  }

  onclose = (event) => {
    console.log("websocket has been closed");
  }

  onerror = (event) => {
    console.error("some error happens to websocket");
  }

  onopen = (event) => {
    this.ws.send("websocket connected");
  }

  onmessage = (event: MessageEvent) => {
    console.log('message received', event.data);
  }

}
