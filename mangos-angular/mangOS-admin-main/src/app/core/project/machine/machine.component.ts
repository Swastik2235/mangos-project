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
import { MachineFormComponent } from 'src/app/shared/dialogs/project/machine-form/machine-form.component';

export interface MachineItem {
	id:number;
	slug:string;
	title: string;
	order: string;
	note: string;
	spec : string;
	tower : string	
}

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<MachineItem>;
	tableData:MachineItem[]=[];
	dataSource = new MatTableDataSource<MachineItem>(this.tableData);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'content','action'];
	
	apiUrl = ''
	error:any;
	constructor(private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute) {
	// this.dataSource = new MachineDataSource();
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
		this.auth.getAPI('machine/').subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.apiUrl = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide();
		})
  }

	addMachine(){
		let dialogRef =this.dialog.open(MachineFormComponent,{
			width:"25%",
			data:{
				title:"Add Machine"
			}
		});
		dialogRef.afterClosed().subscribe(responce => {
			if(responce){
				this.dataSource.data.push(responce)
				this.dataSource._updateChangeSubscription()
			}
		});
	}

	editMachine(indx:number){
		console.log( this.dataSource.data[indx])
		let editDialog = this.dialog.open(MachineFormComponent,{
			width: "50%",
			data : {
				title : "Edit Machine",
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
				title: 'Machine',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].slug
				console.log(id)
				this.auth.patchAPI('machine/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
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
