import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
@Injectable()
export class AppService {
    public feed: any;
    constructor(private http: HttpClient) { }
}
