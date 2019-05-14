import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
@Injectable()
export class ChatPageService implements OnInit {
    public feed: any;
    constructor(private http: HttpClient) { }
    ngOnInit() {   }

    postRequest(data) {
        return this.http.post('http://localhost:2000/auth' , data ).toPromise().then(resp => resp) ;
    }

    fetchUsers() {
        const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
        return this.http.get('http://localhost:2000/fetchUsers', {headers}).toPromise().then(resp => resp) ;
    }

    fetchMessage(id) {
        const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
        // const params = new HttpParams().set('user', id);
        return this.http.get('http://localhost:2000/fetchMessages/' + id , {headers}).toPromise().then(resp => resp) ;
    }
}
