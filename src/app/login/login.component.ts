import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  private user: any;
  public enter: boolean;
  constructor(private loginService: LoginService, private router: Router, private authService: AuthGuard) {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.enter = false;
    this.router.navigate(['']);
    this.user = { username: '', password: '' };
  }
  async submit() {
    // console.log(this.user);
    if (!this.user.email.trim() || !this.user.password.trim()) {
      alert('invalid email and password combination');
      return;
    }
    const reply = await this.loginService.loginRequest(this.user).then(res => res);
    console.log('>>>>>>>>>>>', reply);
    if (reply.error.length) {
      alert('unsuccessful');
      return;
    }
    localStorage.setItem('token', reply.data);
    this.router.navigate(['app']);
  }

  async register(){

  }

 
}
