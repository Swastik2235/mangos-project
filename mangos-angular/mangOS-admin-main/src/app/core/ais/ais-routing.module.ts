import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZohoCrmComponent } from './zoho-crm/zoho-crm.component';

const routes: Routes = [
  { path: 'zoho-crm', component: ZohoCrmComponent },
  { path: 'zoho-crm/callback', component: ZohoCrmComponent },
  { path: '', redirectTo: 'zoho-crm', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AisRoutingModule { }