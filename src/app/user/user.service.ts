import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService{

    constructor( private http: HttpClient ){
    }
    

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>('http://127.0.0.1:3000/user/getUsers');
    }

}