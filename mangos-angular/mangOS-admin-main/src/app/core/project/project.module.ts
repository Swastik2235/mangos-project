import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSettingComponent } from './project-setting/project-setting.component';
import { TaskComponent } from './task/task.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { JobCardComponent } from './job-card/job-card.component';
import { JobFormComponent } from './job-form/job-form.component';
import { MachineComponent } from './machine/machine.component';
import { SectionComponent } from './section/section.component';
import { MarkComponent } from './mark/mark.component';
import { TowerComponent } from './tower/tower.component';
import { BomComponent } from './bom/bom.component';
import { ProductionComponent } from './production/production.component';
import { PackagingComponent } from './packaging/packaging.component';
import { JobInvoiceComponent } from './job-invoice/job-invoice.component';
import { PackagingInvoiceComponent } from './packaging-invoice/packaging-invoice.component';
import { ReportComponent } from './report/report.component';
import { PackFormComponent } from './pack-form/pack-form.component';
import { CuttingPlanComponent } from './cutting-plan/cutting-plan.component';
import { OperationComponent } from './operation/operation.component';
import { ServiceComponent } from './service/service.component';
import { GalvaMaterialComponent } from './galva-material/galva-material.component';
import { GalvaJobCardComponent } from './galva-job-card/galva-job-card.component';
import { TankComponent } from './tank/tank.component';
import { TankDataComponent } from './tank-data/tank-data.component';
import { GalvaJobFormComponent } from './galva-job-form/galva-job-form.component';
// import { ReportComponent } from './report/report.component';



@NgModule({
	declarations: [
		ProjectComponent,
		ProjectDetailComponent, 
		ProjectSettingComponent, 
		ProjectFormComponent, 
		TaskComponent, 
		ProjectFormComponent,
		JobCardComponent, 
		JobFormComponent, 
		MachineComponent, 
		SectionComponent, 
		MarkComponent, 
		TowerComponent, 
		BomComponent, 
		ProductionComponent, 
		PackagingComponent, 
		JobInvoiceComponent, 
		PackagingInvoiceComponent, 
		ReportComponent,
		PackFormComponent, 
		CuttingPlanComponent, 
		OperationComponent, 
		ServiceComponent, 
		GalvaMaterialComponent, 
		GalvaJobCardComponent, 
		TankComponent, 
		TankDataComponent, GalvaJobFormComponent,
	],
	imports: [
		CommonModule,
		ProjectRoutingModule,
		MatTabsModule,
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
		MatListModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatChipsModule,
		FlexLayoutModule,
  ]
})
export class ProjectModule { }
