import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CompanyComponent } from './company/company.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { ClientComponent } from './client/client.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { InviteComponent } from './invite/invite.component'

const routes: Routes = [
	{ path: 'permission/edit/:id', component: PermissionFormComponent },
	{ path: 'employee/edit/:id', component: EmployeeFormComponent },
	{ path: 'company/edit/:id', component: CompanyFormComponent },
	{ path: 'client/edit/:id', component: ClientFormComponent },
	{ path: 'employee/add', component: EmployeeFormComponent },
	{ path: 'company/add', component: CompanyFormComponent },
	{ path: 'client/add', component: ClientFormComponent },
	{ path: 'permission/add', component: PermissionFormComponent },
	{ path: 'permission', component: PermissionsComponent },
	{ path: 'company', component: CompanyComponent },
	{ path: 'employee', component: EmployeeComponent },
	{ path: 'client', component: ClientComponent },
	{ path: 'invite', component: InviteComponent },
		
	{ path: '', component: OrganizationComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OrganizationRoutingModule { }
