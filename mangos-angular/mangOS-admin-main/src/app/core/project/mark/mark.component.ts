import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogModule } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component'
import { MachineFormComponent } from 'src/app/shared/dialogs/project/machine-form/machine-form.component';
import { NgxSpinnerService } from 'ngx-spinner';


export interface MarkItem {
	id:number;
	title: string;
	order: string;
	note: string;
	spec : string;
	tower : string
	
	}

@Component({
	selector: 'app-mark',
	templateUrl: './mark.component.html',
	styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<MarkItem>;
	tableData:MarkItem[]=[];
	dataSource = new MatTableDataSource<MarkItem>(this.tableData);

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['title', 'content','action'];

	error='';
	apiUrl = ''
	// error:any;

	constructor(private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute) {
		// this.dataSource = new MarkDataSource();
		this.spinner.show()
		this.loadData()
		
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}



	loadData(){
		this.auth.getAPI('mark/').subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.apiUrl = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide();
		})
  	}

	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	addMark(){
		let dialogRef =this.dialog.open(MachineFormComponent,{
			width:"50%",
			data:{
				title:"Add Mark"
			}
		});
		dialogRef.afterClosed().subscribe(responce => {
			if(responce){
				this.dataSource.data.push(responce)
				this.dataSource._updateChangeSubscription()
			}
		});
	}

	editMark(indx:number){
		console.log( this.dataSource.data[indx])
		let editDialog = this.dialog.open(MachineFormComponent,{
			width: "50%",
			data : {
				title : "Edit Mark",
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
				title: 'Mark',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('mark/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
					this.error = error.error.detail
					//console.log(error.error.detail,'eeeeeeeeeeeeeeeeee')
				})
			}
		});
	}
}
