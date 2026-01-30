import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleComponent } from './sale/sale.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { OrderComponent } from './order/order.component';
import { ReportComponent } from './report/report.component';
import { TaxComponent } from './tax/tax.component';



@NgModule({
	declarations: [
		InventoryComponent,
		OrderComponent,
		ReportComponent,
		CategoryComponent,
		ProductComponent,
		ProductFormComponent,
		PurchaseComponent,
		SaleComponent,
		PurchaseFormComponent,
		SaleFormComponent,
		TaxComponent,
	],
	imports: [
		CommonModule,
		InventoryRoutingModule,
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
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		NgxSpinnerModule,
		//SharedModule
	 
		
	],
	exports:[
	MatSortModule,
	MatPaginatorModule,
 	]
})
export class InventoryModule { }
