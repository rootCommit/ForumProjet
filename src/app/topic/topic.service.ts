import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { Topic } from './Topic';
import { PostOwner } from './PostOwner';
import { map } from 'rxjs/operators';



@Injectable()
export class TopicService{

    topicSubject: Subject<Topic[]> = new Subject<Topic[]>();
    
    constructor(private http: HttpClient){
    }

    addTopicToList(topic: Topic){
        this.topicSubject.subscribe(listTopic => {
            listTopic.push(topic);
        });
    }

    getTopicList(): Observable<Topic[]>{
        return this.topicSubject.asObservable();
    }

    //fonction créer un topic -> req de type post
    createTopic(topic: Topic, post: PostOwner): Observable<Topic>{
    
        const reqBody = {
            title: topic.title,
            message: post.messsage
        };
       return this.http.post<Topic>('http://127.0.0.1:3000/topic/newTopic', reqBody);
    }

}