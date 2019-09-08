import { NgModule } from '@angular/core';
import { ConnectComponent } from './connect/connect.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { AuthInterceptorService } from './connect/auth-interceptor.service';
import { HttpInterceptorError } from '../HttpInterceptorError';
import { UserService } from './user.service';

@NgModule(
    {
        imports: [
            BrowserModule,
            CommonModule,
            HttpClientModule,
            FormsModule,
            UserRoutingModule
        ],
        declarations: [
            ConnectComponent,
            SignUpComponent,
            ListComponent
        ],
        providers: [AuthenticationService,
            UserService,
           ]
    }
)
export class UserModule{}