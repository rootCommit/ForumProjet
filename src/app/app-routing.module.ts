import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './user/connect/connect.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  { path: '', component: TopicComponent },
  { path: 'login', component: ConnectComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
