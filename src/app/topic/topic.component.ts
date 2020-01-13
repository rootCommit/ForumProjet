import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { RouterStateSnapshot, Router } from '@angular/router';

import { NgModel } from '@angular/forms';
import { TopicService } from './topic.service';
import { Topic } from './Topic';
import { PostOwner } from './PostOwner';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  topicList: Topic[];
  topic = new Topic();
  postOwner = new PostOwner();

  constructor(private authService: AuthenticationService, private router: Router, private topicService:TopicService) { 
    if(!this.authService.isLogged()){
      this.authService.setUrl(this.router.url);
    }
  }
  messageCorpse = "";
  title = "";
  ngOnInit() {
   this.postOwner.messsage = "";
   this.topic.title ="";
   this.topicService.topicSubject.subscribe(x => {
     this.topicList = x
   });
  }

  onSubmit(){
    this.postOwner.id="";
    this.postOwner.idAuthor = this.authService.getUserLoggedId();
    
    this.topic.authorId = this.authService.getUserLoggedId();

    if (this.topic.title != "" && this.postOwner.messsage != ""){
      this.topicService.createTopic(this.topic, this.postOwner).subscribe(
        x => {
        
          this.topicService.topicSubject.subscribe((topic) => {
            console.log(topic);
          });
          this.topicService.topicSubject.next([x]);
          
        }
      );
    }
    
  }

}
