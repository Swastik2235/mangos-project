import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxSpinnerModule } from 'ngx-spinner';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CompanyComponent } from './company/company.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { ClientComponent } from './client/client.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { InviteComponent } from './invite/invite.component';


@NgModule({
	declarations: [
		OrganizationComponent,
		EmployeeComponent,
		EmployeeFormComponent,
		CompanyComponent,
		CompanyFormComponent,
		PermissionsComponent,
  		PermissionFormComponent,
  		ClientComponent,
    	ClientFormComponent,
  		InviteComponent
	],
	imports: [
		CommonModule,
		OrganizationRoutingModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		LayoutModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatDialogModule,
		MatDividerModule,
		MatDatepickerModule,
		MatNativeDateModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatToolbarModule,
		MatCheckboxModule,
		NgxSpinnerModule,
		MatFormFieldModule,
		MatSnackBarModule,
		FlexLayoutModule,
	]
})
export class OrganizationModule { }
