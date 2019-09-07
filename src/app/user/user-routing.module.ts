import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    { path: 'login', component: ConnectComponent },
    { path: 'signup', component: SignUpComponent }
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule{

}