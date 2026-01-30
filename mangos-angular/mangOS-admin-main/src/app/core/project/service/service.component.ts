import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogModule } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component';
import { ServiceFormComponent } from 'src/app/shared/dialogs/project/service-form/service-form.component';




export interface ServiceItem {
	id:number;
	slug:string;
	title: string;
	order: string;
	note: string;
	spec : string;
	tower : string
	
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<ServiceItem>;
	tableData:ServiceItem[]=[];
	dataSource = new MatTableDataSource<ServiceItem>(this.tableData);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'content','action'];
	
	apiUrl = ''
	error:any;
	constructor(private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute) {
	// this.dataSource = new ServiceDataSource();
		this.spinner.show()
  	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	ngOnInit(){
		this.loadData()
	}

	loadData(){
		this.auth.getAPI('service/').subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.apiUrl = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide();
		})
  }

	addService(){
		let dialogRef =this.dialog.open(ServiceFormComponent,{
			width:"25%",
			data:{
				title:"Add Service"
			}
		});
		dialogRef.afterClosed().subscribe(responce => {
			if(responce){
				this.dataSource.data.push(responce)
				this.dataSource._updateChangeSubscription()
			}
		});
	}

	editService(indx:number){
		console.log( this.dataSource.data[indx])
		let editDialog = this.dialog.open(ServiceFormComponent,{
			width: "50%",
			data : {
				title : "Edit Service",
				myData : this.dataSource.data[indx]
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
				title: 'Service',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].slug
				console.log(id)
				this.auth.patchAPI('service/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
					this.error = error.error.detail
					//console.log(error.error.detail,'eeeeeeeeeeeeeeeeee')
				})
			}
		});
	}

	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}
}
