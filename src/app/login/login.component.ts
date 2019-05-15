import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  private user: any;
  public enter: boolean;
  public new: { name: string, username: string, email: string, password: string };
  // public reply: { error: any, data: any, info: any };
  constructor(private loginService: LoginService, private router: Router, private authService: AuthGuard, private toastr: ToastrService) {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.enter = false;
    this.router.navigate(['']);
    this.user = { username: '', password: '' };
    this.new = { username: '', password: '', email: '', name: '' };

  }
  async submit() {
    // console.log(this.user);
    if (!this.user.username.trim() || !this.user.password.trim()) {
      alert('invalid email and password combination');
      return;
    }
    await this.loginService.loginRequest(this.user).then((res: { error: any, info: any, data: any }) => {
      if (res.error) {
        this.toastr.error(res.error);
        return;
      }
      this.toastr.success('Login Successful');
      localStorage.setItem('token', res.info);
      this.router.navigate(['app']);
    });

  }

  async register() {
    await this.loginService.userRequest(this.new).then((res: { error: any, info: any, data: any }) => {
      if (res.error) {
        this.toastr.error(res.error);
        return;
      }
      this.toastr.success(res.info);
    });
    this.new = { username: '', password: '', email: '', name: '' };

  }

  async check() {
    await this.loginService.checkRequest(this.new.username).then((res: { error: any, info: any, data: any }) => {
      if (res.error) {
        this.toastr.error(res.error);
        this.new.username = '';
        return;
      }
      this.toastr.success(res.info);
    });
  }


}
