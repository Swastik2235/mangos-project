import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//mport { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';
import { NgxSpinnerService } from 'ngx-spinner';
//import { ProductDataSource, ProductItem } from './product-datasource';

export interface ProductItem {
	id: number;
	category : string;
	name: string;
	description: string;
	quantity:number;
	sale:number;
	timestamp : string;
	utimestamp : string
	
  }

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	
		
	tableData:ProductItem[]=[];
	dataSource = new MatTableDataSource<ProductItem>(this.tableData);


	//for permissions---------->
	userPermissions :any=[]
	viewProduct = false;
	addProduct = false;
	editProduct = false;
	deleteProduct = false;

	//error message ------>
	error:any;

	
	next:any = '';
	//activeJobData:any=[];

  	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 	displayedColumns = ['id', 'category','name','description','quantity','sale','purchase','action'];

	constructor(private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService) {
		this.spinner.show();
	}

  	ngOnInit(){
	
		this.loadData()
		this.userPermissions = localStorage.getItem('userPermissions')
		if(this.userPermissions.includes("item.add_item")){
			this.addProduct = true
		}
		if(this.userPermissions.includes("item.change_item")){
			this.editProduct = true
		}
		if(this.userPermissions.includes("item.delete_item")){
			this.deleteProduct = true
		}
		if(this.userPermissions.includes("item.view_item")){
			this.viewProduct = true
		}
 	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		}

	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

  	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Product',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.deleteAPI('item/'+ id ).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
					
					console.log(error.error,'error')
					let errorDetail = [error.error['detail']]

					for(let i=0;i<error.error.objects.length;i++){
						errorDetail.push('Table :'+error.error.objects[i]['model']+', Title : '+error.error.objects[i]['title'])

					}
					this.dialog.open(DeleteComponent,{
						width:"30%",
						data:{
							title: 'Error',
							error : errorDetail,
						}
					});
				})
			}
		});
	}
	
	loadData(){
		this.auth.getAPI('item/?'+this.next).subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.next = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
		})
	}

	// downloadFile(type:string){
	// 	console.log(type)
	// 	// this.auth.getAPI('export/?type='+type)
	// }
	downloadFile(fileType:string){
		console.log(fileType)
		this.auth.getAPI('export-products/?type='+fileType).subscribe(res=>{
			
			// this.fileUrl = res.results.file
			if(fileType=='pdf'){
				window.open(res.results.file,'_blank')
			}else{
				window.location.href = res.results.file
			}
			console.log(res)
		})
	}

	


	
}
