import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';
import { TaxFormComponent } from 'src/app/shared/dialogs/inventory/tax-form/tax-form.component'; 
import { NgxSpinnerService } from 'ngx-spinner';

export interface TaxItem {
	id: number;
	type: number;
	name: string;
	value : string;
		
	}

@Component({
	selector: 'app-tax',
	templateUrl: './tax.component.html',
	styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<TaxItem>;
 
	tableData: TaxItem[]=[];
	deleteTax:any;
	error =""
	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['id','type', 'name','value','action'];
	dataSource = new MatTableDataSource<TaxItem>(this.tableData);


	userPermissions :any=[]
	viewTaxPermission = false;
	addTaxPermission = false;
	editTaxPermission = false;
	deleteTaxPermission = false;

	constructor(private auth : AuthenticationService,private spinner: NgxSpinnerService,public dialog: MatDialog) {
		//this.dataSource = new TaxDataSource();
		this.spinner.show()
		this.loadData()
	}

	ngOnInit(){
		this.loadData()
		this.userPermissions = localStorage.getItem('userPermissions')
		if(this.userPermissions.includes("tax.add_tax")){
			this.addTaxPermission = true
		}
		if(this.userPermissions.includes("tax.change_tax")){
			this.editTaxPermission = true
			
		}
		if(this.userPermissions.includes("tax.delete_tax")){
			this.deleteTaxPermission = true
			
		}
		if(this.userPermissions.includes("tax.view_tax")){
			this.viewTaxPermission = true
			
		}
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	loadData(){
		this.auth.getAPI('tax/').subscribe(responce=>{
			//console.log(responce.results)
			this.dataSource.data = responce.results
			this.spinner.hide()
		})
	}

	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	

	addTax(){
		let addDialog = this.dialog.open(TaxFormComponent,{
			width: "50%",
			data : {
				title : "Add Tax",
				addTax : this.addTaxPermission
			}
		});
		addDialog.afterClosed().subscribe(responce=>{
			
			if(responce){
				this.dataSource.data.push(responce)
				this.dataSource._updateChangeSubscription()
			}
		})
	}

	editTax(indx:number){
		let editDialog = this.dialog.open(TaxFormComponent,{
			width: "50%",
			data : {
				title : "Edit",
				tax_data : this.dataSource.data[indx]
			}
		});
		editDialog.afterClosed().subscribe(responce=>{
			if (responce){
				this.dataSource.data[indx] = responce
				this.dataSource._updateChangeSubscription()
			}
		})
	}

	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Tax',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('tax/'+ id +'/',{'status':'Delete'}).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
					let errorDetail = [error.error['detail']]
					this.dialog.open(DeleteComponent,{
						width:"30%",
						data:{
							title: 'Error',
							error :errorDetail,
							
						}
					});
					//this.error = error.error.detail
					//console.log(error.error.detail,'eeeeeeeeeeeeeeeeee')
				})
			}
		});
	}
}
