import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from './User';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService{
    private userLogged: User = null;
    private token: String;
    private expiration: Date;
    private helper = new JwtHelperService();

    constructor(private http: HttpClient){}


    login(username: string, password: string){
      
        const loginData = { username: username, password: password };
        this.http.post<{
            message: string,
            expireIn: number,
            id_user: string,
            email: string,
            username: string,
            token: string
        }>("http://127.0.0.1:3000/user/login", loginData)
        .subscribe(Response => {
            this.userLogged =  {username: Response.username, id:Response.id_user, email: Response.email};
            this.saveAuthData(Response.token, this.userLogged);
            
            window.location.replace('/');
        },
        error => {
            console.log(error);
            
        });

    }
  
    isLogged(): boolean{
        const token = localStorage.getItem('token');
        const isLogged = !this.helper.isTokenExpired(token);
        
        console.log("expiration: " + this.helper.getTokenExpirationDate(token));
        return isLogged;
    }

    saveAuthData(pToken: string, pUser: User): void{
        localStorage.setItem('token', pToken);
        localStorage.setItem('username', pUser.username);
        localStorage.setItem('email', pUser.email);
        localStorage.setItem('id', pUser.id);
    }

    clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
    }

    logout(){
        this.clearAuthData();
        this.token = "";
        this.userLogged = null;
    }

}