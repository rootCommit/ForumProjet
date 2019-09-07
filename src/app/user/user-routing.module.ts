import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
    { path: 'members', component: ListComponent, canActivate: [AuthGuard] },
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