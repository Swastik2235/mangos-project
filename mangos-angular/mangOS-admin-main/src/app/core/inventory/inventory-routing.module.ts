import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { SaleComponent } from './sale/sale.component';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { TaxComponent } from './tax/tax.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [

  { path: 'product/edit/:id', component: ProductFormComponent},
  { path: 'purchase/edit/:id', component: PurchaseFormComponent},
  { path: 'sale/edit/:id', component: SaleFormComponent},
  { path: 'product/add', component: ProductFormComponent},
  { path: 'purchase/add', component: PurchaseFormComponent},
  { path: 'sale/add', component: SaleFormComponent},
  { path: 'report', component: ReportComponent},
  { path: 'tax', component: TaxComponent},
  { path: 'purchase', component: PurchaseComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'product', component: ProductComponent},
  { path: 'sale', component: SaleComponent},
  { path: '', component: InventoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
