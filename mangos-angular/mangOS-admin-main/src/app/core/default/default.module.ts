import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http' ;
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PipesModule } from 'src/app/pipes/pipes.module';

//new added modules
import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
// import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
//import { AuthenticationService } from 'src/app/service/authentication.service';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { HomeComponent } from './home/home.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
	declarations: [
		DefaultComponent,
		ProfileComponent,
		DashboardComponent,
  		ChangePasswordComponent,
    	DocumentComponent,
     	DocumentDetailComponent,
      HomeComponent,
    	
	],
	imports: [
		CommonModule,
		DefaultRoutingModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		LayoutModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		HttpClientModule,
		NgxSpinnerModule,
		MatToolbarModule,
		FlexLayoutModule,
		MatFormFieldModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		PipesModule,
		MatSnackBarModule,
		SharedModule
	],
	
	//providers: [AuthenticationService],
})
export class DefaultModule { }
