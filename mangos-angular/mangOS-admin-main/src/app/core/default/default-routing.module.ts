import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    // { path: 'forgot-password/:uid/:token',component:ForgotPasswordComponent},
    // { path: 'forgot-password',component:ForgotPasswordComponent},
    { path: 'document/:id', component: DocumentDetailComponent },
    { path: 'document', component: DocumentComponent },
    { path: 'change-password',component:ChangePasswordComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'home', component: HomeComponent },
    { path: '', component: DashboardComponent },
    // { path: '', component: DefaultComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
