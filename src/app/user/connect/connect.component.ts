import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onConnect(connectFormsModel: NgForm) : void{
    console.log(connectFormsModel);
    console.log("password: "+connectFormsModel.form.value.password);
    this.authService.login(connectFormsModel.form.value.username, connectFormsModel.form.value.password);
  }

}
