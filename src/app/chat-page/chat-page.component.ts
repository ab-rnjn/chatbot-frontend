import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatPageService } from './chat-page.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { Observer } from 'rxjs/Observer';
// import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit, OnDestroy {

  public socket;
  public userMap: any[];
  public currentUser: any; // userid
  public messageMap: any = {};
  public currentMessage: string;
  public messageList: any[];
  public emoji: any;

  public onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }
  constructor(private chatPageService: ChatPageService, private toastr: ToastrService, private router: Router) {
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
    this.socket.emit('connect-user', { token: localStorage.getItem('token') });
    this.onMessage()
      .subscribe((data) => {
        // this.toastr.error(message);
        // alert('ccc');
        if (!this.messageMap[data.alpha_user]) {
          this.toastr.success(data.message);
        }
        else if (this.messageMap[data.alpha_user]) {
          this.messageMap[data.alpha_user].push({
            message: data.message, sentiment: data.sentiment, to: data.beta_user,
            from: data.alpha_user
          });
        }
        console.log('messageMap', this.messageMap);
        console.log('=====message came========', data);
      });
  }
  ngOnInit() {
    this.currentUser = { name: '' };
    this.emoji = { ':)': 'mood', ':(': 'sentiment_very_dissatisfied', ':|': 'sentiment_satisfied' };
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
    if (!this.messageMap[this.currentUser._id]) {
      this.messageMap[this.currentUser._id] = [];
    }
    this.messageMap[this.currentUser._id].push({ message: this.currentMessage, sentiment: '', to: this.currentUser._id });
    console.log('messagemap', this.messageMap);
    this.socket.emit('message', { beta: this.currentUser._id, message: this.currentMessage, token: localStorage.getItem('token') });
    this.currentMessage = '';
  }

  async fetchMessage(user, i) {
    this.currentUser = user;
    if (this.messageMap[this.currentUser._id]) {
      this.messageList = this.messageMap[this.currentUser._id];
      return;
    }
    this.messageList = [];
    await this.chatPageService.fetchMessage(user._id).then((res: { error: any, info: any, data: any }) => {
      console.log('>>>>', res);
      this.messageMap[user._id] = res.data;
    });
    this.messageList = this.messageMap[this.currentUser._id];


  }


  logout() {
    this.socket.emit('disconnect-user', { token: localStorage.getItem('token') });
    window.localStorage.clear();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.socket.emit('disconnect-user', { token: localStorage.getItem('token') });
    window.localStorage.clear();
  }






}
