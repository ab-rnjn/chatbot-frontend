import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
@Injectable()
export class LoginService implements OnInit {
    public feed: any;
    constructor(private http: HttpClient) { }
    ngOnInit() { }

    // putRequest(data) {
    //     return this.http.put('http://localhost:2000/pages/update', data) ;
    // }

    // getRequest () {
    //     return this.http.get('http://localhost:2000/pages/getall').toPromise().then(response => response) ;
    // }

    // getoneRequest(data) {
    //     return this.http.get('http://localhost:2000/pages/getone/' + data ).toPromise().then(response => response);

    // }

    // deleteRequest(data) {
    //     return this.http.delete('http://localhost:2000/pages/delete/' + data ).toPromise().then(response => response) ;
    // }

    loginRequest(data) {
        return this.http.post('http://localhost:2000/login', data).toPromise().then(resp => resp);
    }


}
