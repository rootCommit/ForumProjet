import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './user/authentication.service';

export class AuthGuard implements CanActivate{
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin(state.url);
    }

    checkLogin(url: string){
        if (this.authService.isLogged()){
            return true;
        }
        this.authService.setUrl(url);
        this.router.navigate(['/login']);
        return false;
    }

}