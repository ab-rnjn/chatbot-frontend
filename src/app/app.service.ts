import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
@Injectable()
export class AppService {
    public feed: any;
    constructor(private http: HttpClient) { }

    sendTextMessage(data) {
        return this.http.post('http://localhost:2000/sendMessage' , data ).toPromise().then(resp => resp) ;
    }

    addNewUser(data) {
        return this.http.post('http://localhost:2000/newUser' , data ).toPromise().then(resp => resp) ;
    }

    updateUserDetails(data) {
        return this.http.post('http://localhost:2000/editUser' , data ).toPromise().then(resp => resp) ;
    }

    fetchAllUsers() {
        return this.http.get('http://localhost:2000/fetchUsers'  ).toPromise().then(res => res) ;
    }
}
