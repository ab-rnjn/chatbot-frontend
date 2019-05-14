import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AuthGuard} from './auth/auth-guard.service';
import {AppRoutingModule} from './app.routing';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoginComponent } from './login/login.component';

import { LoginService } from './login/login.service';

import { ChatPageService } from './chat-page/chat-page.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),

  ],
  providers: [ AuthGuard,  LoginService, ChatPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
