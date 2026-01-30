import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PdfPopupComponent } from 'src/app/shared/dialogs/default/pdf-popup/pdf-popup.component';

export interface SaleItem {
	id: number;
	description: string;
	order_status : string;
  	items : number;
	}

@Component({
	selector: 'app-sale',
	templateUrl: './sale.component.html',
	styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<SaleItem>;

	tableData: SaleItem[]=[];
	//Columns displayed in the table. 
	displayedColumns: string[] = ['id', 'description','status','items','invoice','action'];
	dataSource = new MatTableDataSource<SaleItem>(this.tableData);

	userPermissions :any=[]
	viewSale = false;
	addOrder = false;
	editOrder = false;
	deleteOrder = false;
	//count :number = 0; //for pagination
	error = ''
	apiUrl = 'sale=true'
  
  

	constructor(private auth : AuthenticationService,private spinner: NgxSpinnerService,public dialog: MatDialog) {
		this.spinner.show();
	}

	ngOnInit(){
		
		this.loadData()
		this.userPermissions = localStorage.getItem('userPermissions')
		if(this.userPermissions.includes("order.add_order")){
			this.addOrder = true
		}
		if(this.userPermissions.includes("order.change_order")){
			this.editOrder = true
		}
		if(this.userPermissions.includes("order.delete_order")){
			this.deleteOrder = true
		}
		if(this.userPermissions.includes("order.view_order")){
			this.viewSale = true
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
			this.auth.patchAPI('order/'+ id +'/',{'status':'Delete',"wishlists":[]}).subscribe(responce=>{
				console.log(responce,'rrrrrrrrrrrrrr')
				this.dataSource.data.splice(result,1);
				this.dataSource._updateChangeSubscription()
			},error =>{
				
				//console.log(error.error,'error')
				let errorDetail = [error.error['detail']]

				for(let i=0;i<error.error.objects.length;i++){
					errorDetail.push('Table :'+error.error.objects[i]['model']+', Title : '+error.error.objects[i]['title'])

				}
				// let error_detail = []
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

	//for invoice dialog
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
