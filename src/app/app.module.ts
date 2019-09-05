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
    UserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
