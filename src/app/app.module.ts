import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { UserModule } from './user/user.module';
import { TopicComponent } from './topic/topic.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './user/authentication.service';
import { AuthGuard } from './auth-guard.service';
import { AuthInterceptorService } from './user/connect/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopicComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [AuthGuard,
              {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
