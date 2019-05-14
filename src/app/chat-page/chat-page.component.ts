import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatPageService } from './chat-page.service';
import { ToastrService } from 'ngx-toastr';
// import { Observer } from 'rxjs/Observer';
// import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  public socket;
  public userMap: any[];
  public currentUser: any; // userid
  public messageMap: any;
  public currentMessage: string;
  public messageList: any[];

  public onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }
  constructor(private chatPageService: ChatPageService, private toastr: ToastrService) {
    this.socket = socketIo('http://localhost:2000'
      // , {
      //   transportOptions: {
      //     polling: {
      //       extraHeaders: {
      //         Authorization: localStorage.getItem('token')
      //       }
      //     }
      //   }
      // }
    );
    this.socket.emit('connect-user', {token: localStorage.getItem('token')});
    this.onMessage()
      .subscribe((data) => {
        // this.toastr.error(message);
        if (this.messageMap[data.beta_user]) {
          this.messageMap[data.beta_user].push({ message: data.message, emoji: data.sentiment });
        }
        console.log('=====', data);
      });
  }
  ngOnInit() {
    this.currentUser = { name: '' };
    this.render();
  }


  async render() {
    await this.chatPageService.fetchUsers().then((res: { error: any, info: any, data: any }) => {
      console.log('>>>>', res);
      this.userMap = res.data;
    });
    return;
  }


  sendMessage() {
    this.currentMessage = this.currentMessage.trim();
    if (!this.currentMessage) {
      return;
    }
    this.messageMap[this.currentUser._id].push(this.currentMessage);
    this.socket.emit('message', { beta: this.currentUser._id, message: this.currentMessage });
    this.currentMessage = '';
  }

  async fetchMessage(user, i) {
    this.currentUser = user;
    if (this.messageMap[this.currentUser._id]) {
      return;
    }
    await this.chatPageService.fetchMessage(user._id).then((res: { error: any, info: any, data: any }) => {
      console.log('>>>>', res);
      this.messageMap[user._id] = res.data;
    });

  }








}
