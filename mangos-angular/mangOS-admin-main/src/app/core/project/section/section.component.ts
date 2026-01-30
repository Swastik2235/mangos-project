import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component'
import { SectionFormComponent } from 'src/app/shared/dialogs/project/section-form/section-form.component';
import { NgxSpinnerService } from 'ngx-spinner';



export interface SectionItem {
	id:number;
	title: string;
	order: string;
	note: string;
	spec : string;
	tower : string
	
	}
	
@Component({
	selector: 'app-section',
	templateUrl: './section.component.html',
	styleUrls: ['./section.component.scss']
})
export class SectionComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<SectionItem>;
	tableData:SectionItem[]=[];
  	dataSource = new MatTableDataSource<SectionItem>(this.tableData);
	// dataSource: SectionDataSource;

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['title', 'height','width','length','thickness','action'];

	apiUrl = ''
	error:any;

	constructor(private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute) {
		// this.dataSource = new SectionDataSource();
		// this.loadData()
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
		this.auth.getAPI('section/?'+this.apiUrl).subscribe(responce=>{
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

	addSection(){
		let dialogRef =this.dialog.open(SectionFormComponent,{
			width:"50%",
			data:{
				title:"Add Section"
			}
		});
		dialogRef.afterClosed().subscribe(responce => {
			if(responce){
				this.dataSource.data.push(responce)
				this.dataSource._updateChangeSubscription()
			}
		});
	}

	editSection(indx:number){
		console.log( this.dataSource.data[indx])
		let editDialog = this.dialog.open(SectionFormComponent,{
			width: "50%",
			data : {
				title : "Edit Section",
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
				this.auth.patchAPI('section/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
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
