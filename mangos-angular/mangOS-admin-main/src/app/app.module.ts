import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteDirective } from './delete.directive';

// import { LoginComponent } from './core/default/login/login.component';
// import { DefaultComponent } from './core/default/default.component';

//change for MatDialog

//import { AuthenticationService } from './service/authentication.service';

@NgModule({

	declarations: [
		AppComponent,
//   DeleteDirective,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgbModule,
		MatDialogModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatDialogModule,
		MatCardModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		HttpClientModule
		//LoginComponent
	],
	providers: [AuthenticationService],
	bootstrap: [AppComponent]


})
export class AppModule { }
