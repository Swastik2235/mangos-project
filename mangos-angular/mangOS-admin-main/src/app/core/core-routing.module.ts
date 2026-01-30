import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ 
		path: '',
		component: CoreComponent,
		children:[
			{ path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
			{ path: 'organization', loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule) },
			{ path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
			{ path: '', loadChildren: () => import('./default/default.module').then(m => m.DefaultModule) },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoreRoutingModule { }
