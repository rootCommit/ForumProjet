import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { Topic } from './Topic';
import { PostOwner } from './PostOwner';

@Injectable()
export class TopicService{

    topicList: Subject<Topic[]>;
    
    constructor(private http: HttpClient){
    }

    //fonction créer un topic -> req de type post
    createTopic(topic: Topic, post: PostOwner){
    
        const reqBody = {
            title: topic.title,
            message: post.messsage
        };
       return this.http.post('http://127.0.0.1:3000/topic/newTopic', reqBody);
    }

}