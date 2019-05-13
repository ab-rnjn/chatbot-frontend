import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public userMap: any;
  public currentUser: any;
  public editFlag: boolean;
  public textMessage: string;
  // public newUser: {First_Name: string, Last_Name: string, Phone_No: number};
  public nfirst: string;
  public nlast: string;
  public nphone: number;
  public index: number;

  constructor(private appService: AppService, private toastr: ToastrService) {}

  ngOnInit() {
    this.editFlag = false;
    this.render();
    this.currentUser = { First_Name: null, Last_Name: null, Phone_No: null };
    this.textMessage = '';
    this.nfirst = '';
    this.nlast = '';
    this.nphone = null;
  }


  async submit() {
    // console.log('user', user);
    // debugger;
    await this.appService.updateUserDetails({ fname: this.currentUser.First_Name,
       lname: this.currentUser.Last_Name, phone: this.currentUser.Phone_No, id: this.currentUser._id })
      .then((res: { error: any, info: any, data: any }) => {
        if (res.error) {
          this.toastr.error(res.error, '', {positionClass: 'toast-top-right'});
          return;
        }
        this.toastr.success(res.info);
        this.userMap[this.index] = res.data;
        return;
      });
    this.currentUser = { First_Name: null, Last_Name: null, Phone_No: null };
    this.index = null;

  }

  async render() {
    await this.appService.fetchAllUsers().then((res: { error: any, info: any, data: any }) => {
      console.log('>>>>', res);
      this.userMap = res.data;
    });
    return;
  }

  editUser(user, i) {
    this.editFlag = false;
    this.currentUser = {...user};
    this.index = i;
    console.log('>>>>>>>>>>>>>>>>>', this.userMap);
  }

  editDetail() {
    this.editFlag = true;
  }

  async add() {
    await this.appService.addNewUser({ fname: this.nfirst, lname: this.nlast, phone: this.nphone })
      .then((res: { error: any, info: any, data: any }) => {
        if (res.error) {
          this.toastr.error(res.error, '', {positionClass: 'toast-top-right'});
          return;
        }
        this.toastr.success(res.info);
        this.userMap.push(res.data);
        return;
      });
    this.nfirst = '';
    this.nlast = '';
    this.nphone = null;
  }

  async send() {
    await this.appService.sendTextMessage({ text: this.textMessage, phone: this.currentUser.Phone_No, id: this.currentUser._id })
      .then((res: { error: any, info: any, data: any }) => {
        if (res.error) {
          this.toastr.error(res.error);
          return;
        }
        this.toastr.success(res.info);
        console.log('message data: ', res.data);
        return;
      });
    this.textMessage = '';
    this.currentUser = { First_Name: null, Last_Name: null, Phone_No: null };



  }
}
