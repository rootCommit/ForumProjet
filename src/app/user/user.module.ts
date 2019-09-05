import { NgModule } from '@angular/core';
import { ConnectComponent } from './connect/connect.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule(
    {
        imports: [
            BrowserModule,
            CommonModule,
            HttpClientModule,
            FormsModule
        ],
        declarations: [
            ConnectComponent
        ],
        providers: [AuthenticationService]
    }
)
export class UserModule{}