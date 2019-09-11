import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }
  errorMessage = "";
  ngOnInit() {
    if(this.authService.isLogged()){
      this.router.navigateByUrl('/');
    }
  }

  onSignUp(formModel: NgForm): void{
    const username = formModel.form.value.username;
    const password = formModel.form.value.password;
    const email = formModel.form.value.email;
    //Je procède au traitement du signup directement à l'abonnement dans le component
    //Dans le but pouvoir afficher les messages d'erreur en reponse de la req dans le component
    this.authService.signUp(username, email, password).subscribe(
      x => {
        console.log(x);
        if(x.message != undefined){
          this.errorMessage = x.message;
        }
        if(x.token != undefined){
          let userLogged = {username: x.username, id:x.id_user, email: x.email, created_at: new Date()};
          this.authService.saveAuthData(x.token, userLogged);
            window.location.replace('/')
        }
        
      }
      ,
      err => {
        if(err instanceof HttpErrorResponse){
          console.log(err);
        }

      }
    );
  }

}
