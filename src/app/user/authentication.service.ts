import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './User';
import { Router } from '@angular/router';
import { LogModel } from './LogModel';


@Injectable()
export class AuthenticationService{
    private userLogged: User = null;
    private token: String;
    private expiration: Date;
    private helper = new JwtHelperService();
    private url = "/";

    constructor(private http: HttpClient){}

    private handleError<T>(operation: string = 'operation', result?: T){
        return (error: any): Observable<T> =>
        {
            console.log(error);
            console.log(`${operation} failed: ${error.message}`);
            return of( result as T ); //l'objet reseulte et passé en param
        } ; //On retourne un obserbble en cas d'erreur pour que l'appli continue quoi qu'il arrive
    }

    public setUrl(url: string) : void{
        this.url = url; 
    }

    login(username: string, password: string): Observable<LogModel>{
      
        const loginData = { username: username, password: password };
            return this.http.post<LogModel>("http://127.0.0.1:3000/user/login", loginData)
        .pipe(
        tap(Response => {
            this.userLogged =  {username: Response.username, id:Response.id_user, email: Response.email};
            this.saveAuthData(Response.token, this.userLogged);
            console.log(Response);
            window.location.replace(this.url);
        }),
        catchError( this.handleError<LogModel>('login'))
        );

    }
  
    isLogged(): boolean{
        const token: string = localStorage.getItem('token');
        if(token != undefined){
            const isLogged = !this.helper.isTokenExpired(token);
        
            return isLogged;
        } else{
            return false;
        }
       
    }
    getToken(): string{
        if(this.isLogged()){
            const token: string = localStorage.getItem('token');
            return token;
        }
        return "";
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

    signUp(pUsername: string, pEmail:string, pPassword: string): Observable<LogModel>{
        const userData = {
            username: pUsername,
            email: pEmail,
            password: pPassword
        } ;

        return this.http.post<LogModel>("http://127.0.0.1:3000/user/signUp", userData).
        pipe(
            catchError(this.handleError<LogModel>('signUp'))
        );
    }

}