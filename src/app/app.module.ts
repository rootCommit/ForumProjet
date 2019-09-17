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
import { BootStrapModule } from './bootstrap.module';
import { ErrorComponent } from './error/error.component';
import { HttpInterceptorError } from './HttpInterceptorError';
import { PreEditPipe } from './topic/preEdit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    TopicComponent,
    PreEditPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BootStrapModule,
    AppRoutingModule,
    UserModule,
    
  ],
  providers: [AuthGuard,
              {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
              {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorError, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]

})
export class AppModule { }
