import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { RouterStateSnapshot, Router } from '@angular/router';

import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  
  constructor(private authService: AuthenticationService, private router: Router) { 
    if(!this.authService.isLogged()){
      this.authService.setUrl(this.router.url);
    }
  }
  messageCorpse = "";
  title = "";
  ngOnInit() {
   
  }

  test(){
    console.log(this.messageCorpse)
  }

}
