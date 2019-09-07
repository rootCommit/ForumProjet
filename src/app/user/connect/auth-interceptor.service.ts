import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

export class AuthInterceptorService implements HttpInterceptor{

    constructor( private authService: AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const token = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer '+ token)
        });
        return next.handle(authRequest);
    }
}