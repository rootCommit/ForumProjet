import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';
import { htmlspecialchars } from 'htmlspecialchars';

/**
 * Listing des users nouveaux users
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor( private userService: UserService ) { }
  usersList: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe(
      x => {
        this.usersList = x;
      }
    );
    htmlspecialchars("<script>alert('issou')</script>");

  }



}
