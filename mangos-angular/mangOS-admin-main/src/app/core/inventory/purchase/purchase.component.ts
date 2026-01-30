import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { PdfPopupComponent } from 'src/app/shared/dialogs/default/pdf-popup/pdf-popup.component';


export interface PurchaseItem {
	id: number;
	description: string;
	order_status : string;
  	items : number;
}


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<PurchaseItem>;

	tableData: PurchaseItem[]=[];
	displayedColumns: string[] = ['id', 'description','order_status','items','invoice','action',];
	dataSource = new MatTableDataSource<PurchaseItem>(this.tableData);

	userPermissions :any=[]
	viewPurchase = false;
	addPurchase = false;
	editPurchase = false;
	deletePurchase = false;
	error = ''

	//for pagination
	apiUrl = 'purchase=true'

	constructor(private auth : AuthenticationService,private spinner: NgxSpinnerService,public dialog: MatDialog) {
		this.spinner.show();

	}
	ngOnInit(){
		this.loadData()
		this.userPermissions = localStorage.getItem('userPermissions')
		//console.log(this.userPermissions)
		if(this.userPermissions.includes("order.add_order")){
			this.addPurchase = true
		}
		if(this.userPermissions.includes("order.change_order")){
			this.editPurchase = true
		}
		if(this.userPermissions.includes("order.delete_order")){
			this.deletePurchase = true
		}
		if(this.userPermissions.includes("order.view_order")){
			this.viewPurchase = true
		}
	}
	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

  	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}


	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Item',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('order/'+ id +"/",{'status':'Delete','wishlists':[]}).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
					
					//console.log(error.error,'error')
					let errorDetail = [error.error['detail']]
					
					for(let i=0;i<error.error.objects.length;i++){
						errorDetail.push('Table :'+error.error.objects[i]['model']+', Title : '+error.error.objects[i]['title'])

					}
					this.dialog.open(DeleteComponent,{
						width:"30%",
						data:{
							title: 'Error',
							error : errorDetail,
							//error_detail : error.error,
							}
						});
					})
				}
			});
		}

	invoiceDialog(item:number){
		this.auth.getAPI('order-invoice/'+item+'/').subscribe(responce=>{
			this.dialog.open(PdfPopupComponent,{
				width:"70%",
				data:{
					pdf : responce.pdf
				}
			});
		})
	}

	loadData(){
		this.auth.getAPI('order/?'+this.apiUrl).subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.apiUrl = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide();
		})
  	}
}
