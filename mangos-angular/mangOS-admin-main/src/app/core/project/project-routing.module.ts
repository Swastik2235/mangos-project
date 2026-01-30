import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { TaskComponent } from './task/task.component';
import { MarkComponent } from './mark/mark.component';
import { TowerComponent } from './tower/tower.component';
import { BomComponent } from './bom/bom.component';
import { MachineComponent } from './machine/machine.component';
import { ServiceComponent } from './service/service.component';
import { SectionComponent } from './section/section.component';
import { JobCardComponent } from './job-card/job-card.component';
import { JobFormComponent } from  './job-form/job-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSettingComponent } from './project-setting/project-setting.component';
import { ProductionComponent } from './production/production.component';
import { PackagingComponent } from './packaging/packaging.component';
import { JobInvoiceComponent } from './job-invoice/job-invoice.component';
import { PackagingInvoiceComponent } from './packaging-invoice/packaging-invoice.component'; 
import { ReportComponent } from './report/report.component';
import { PackFormComponent } from './pack-form/pack-form.component';
import { CuttingPlanComponent } from './cutting-plan/cutting-plan.component';
import { OperationComponent } from './operation/operation.component';
import { TankComponent } from './tank/tank.component';
import { TankDataComponent } from './tank-data/tank-data.component';
import { GalvaMaterialComponent } from './galva-material/galva-material.component';
import { GalvaJobCardComponent } from './galva-job-card/galva-job-card.component';
import { GalvaJobFormComponent } from './galva-job-form/galva-job-form.component';

const routes: Routes = [
	{ path: ':slug/job-card/edit/:id', component: JobFormComponent },
	{ path: ':slug/galva-job-card/edit/:id', component: GalvaJobFormComponent },
	{ path: ':slug/job-card/add', component: JobFormComponent },
	{ path: 'packaging/invoice/:slug', component: PackagingInvoiceComponent },
	{ path: 'packaging/edit/:id', component: PackFormComponent },
	{ path: 'packaging/invoice', component: PackagingInvoiceComponent },
	{ path: 'packaging/:slug', component: PackagingComponent },
	{ path: 'job-card/:slug/job-invoice', component: JobInvoiceComponent},
	{ path: 'job-card/:id', component: JobCardComponent },
	{ path: 'job-card/list/:slug', component: JobCardComponent },
	{ path: 'galva-job-card/list/:slug', component: GalvaJobCardComponent },
	{ path: 'task/:slug', component: TaskComponent },
	{ path: 'setting/:id', component: ProjectSettingComponent },
	{ path: 'edit/:slug', component: ProjectFormComponent },
	{ path: 'cutting-plan/:id', component: CuttingPlanComponent },
	{ path: 'bom/:slug', component: BomComponent },
	{ path: 'galva-material/:slug', component: GalvaMaterialComponent },
	{ path: 'production/:slug', component: ProductionComponent},
	
	// { path: 'packaging/:slug', component: PackFormComponent},
	{ path: 'report/:id', component: ReportComponent},
	{ path: 'add', component: ProjectFormComponent },
	{ path: 'job-card', component: JobCardComponent },
	{ path: 'galva-job-card', component: GalvaJobCardComponent },
	{ path: 'machine', component: MachineComponent },
	{ path: 'tank', component: TankComponent },
	{ path: 'tank-data', component: TankDataComponent },
	{ path: 'service', component: ServiceComponent },
	{ path: 'operation', component: OperationComponent },
	{ path: 'section', component: SectionComponent },
	{ path: 'mark', component: MarkComponent },
	{ path: 'tower', component: TowerComponent },
	{ path: 'bom', component: BomComponent },
	{ path: 'galva-material', component: GalvaMaterialComponent },
	{ path: 'production', component: ProductionComponent },
	{ path: 'packaging', component: PackagingComponent },
	{ path: 'report', component: ReportComponent },
	{ path: 'cutting-plan', component: CuttingPlanComponent },
	{ path: ':slug', component: ProjectDetailComponent },
	{ path: '', component: ProjectComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectRoutingModule { }
