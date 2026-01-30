import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource,MatTable } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component'
import { MachineFormComponent } from 'src/app/shared/dialogs/project/machine-form/machine-form.component';
import { NgxSpinnerService } from 'ngx-spinner';

export interface TowerItem {
	id:number;
	title: string;
	order: string;
	note: string;
	spec : string;
	tower : string
	
	}

@Component({
	selector: 'app-tower',
	templateUrl: './tower.component.html',
	styleUrls: ['./tower.component.scss']
})
export class TowerComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<TowerItem>;
	tableData:TowerItem[]=[];
	dataSource = new MatTableDataSource<TowerItem>(this.tableData);

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['id', 'title','action'];

	apiUrl = ''
	error:any;

	constructor(private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute) {
		// this.dataSource = new TowerDataSource();
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
		this.auth.getAPI('tower/?'+this.apiUrl).subscribe(responce=>{
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

	addTower(){
		let dialogRef =this.dialog.open(MachineFormComponent,{
			width:"25%",
			data:{
				title:"Add Tower",
				tower:"tower"
			}
		});
		dialogRef.afterClosed().subscribe(responce => {
			if(responce){
				this.dataSource.data.push(responce)
				this.dataSource._updateChangeSubscription()
			}
		});
	}

	editTower(indx:number){
		console.log( this.dataSource.data[indx])
		let editDialog = this.dialog.open(MachineFormComponent,{
			width: "50%",
			data : {
				title : "Edit Tower",
				tower:"tower",
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
				title: 'Tower',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('tower/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
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
