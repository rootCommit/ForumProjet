import { NgModule } from '@angular/core';
import { ConnectComponent } from './connect/connect.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserRoutingModule } from './user-routing.module';

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
            SignUpComponent
        ],
        providers: [AuthenticationService]
    }
)
export class UserModule{}