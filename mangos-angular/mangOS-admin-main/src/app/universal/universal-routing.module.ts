import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversalComponent } from './universal.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent} from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
    { 
        path: '',
        component: UniversalComponent,
        children:[
            { path: 'forgot-password/:uid/:token',component:ForgotComponent},
            {path:'login/:token', component: LoginComponent},
            {path:'login', component:LoginComponent},
            {path:'signup', component:SignupComponent},
            {path:'forgot-password', component:ForgotComponent}
           
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversalRoutingModule { }
