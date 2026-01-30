import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { HighchartsChartModule } from 'highcharts-angular';

//new added modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http' ;
import { MatExpansionModule } from '@angular/material/expansion';

import { CoreRoutingModule } from './core-routing.module';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CoreComponent } from './core.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
	declarations: [
		CoreComponent,
		HomeComponent,
	],
	imports: [
		CommonModule,
		CoreRoutingModule,
		MatCardModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		LayoutModule,
		MatSidenavModule,
		MatListModule,
		MatToolbarModule,
		HttpClientModule,
		MatTreeModule,
		MatExpansionModule,
		SharedModule,
		HighchartsChartModule
		//NotificationBarComponent,
	
	],
	
	providers: [AuthenticationService],
})
export class CoreModule { }
