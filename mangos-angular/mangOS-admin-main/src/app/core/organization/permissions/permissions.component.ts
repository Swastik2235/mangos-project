import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';

export interface PermissionsItem {
	id: number;
	description: string;
	order_status : string;
	items : number;
}

@Component({
	selector: 'app-permissions',
	templateUrl: './permissions.component.html',
	styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<PermissionsItem>;

	tableData: PermissionsItem[]=[];
	displayedColumns: string[] = ['id', 'name','action'];
	dataSource = new MatTableDataSource<PermissionsItem>(this.tableData);
	

	addPermission =true;
	editPermission = true;
	deletePermission = true;
	viewPermission = true;
	
	nextPage = '';

	constructor(private auth:AuthenticationService,private spinner: NgxSpinnerService,public dialog: MatDialog) {
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
		this.auth.getAPI('group/?'+this.nextPage).subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.nextPage = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
		})
	}

	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Permission',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.dataSource.data.splice(result,1);
				this.dataSource._updateChangeSubscription()
				// this.auth.patchAPI('permission/'+ id ,{'status':'Delete'}).subscribe(responce=>{
					
				// },error =>{
					
				// 	console.log(error.error,'error')
				// 	let errorDetail = [error.error['detail']]

				// 	for(let i=0;i<error.error.objects.length;i++){
				// 		errorDetail.push('Table :'+error.error.objects[i]['model']+', Title : '+error.error.objects[i]['title'])

				// 	}
				// 	this.dialog.open(DeleteComponent,{
				// 		width:"30%",
				// 		data:{
				// 			title: 'Error',
				// 			error : errorDetail,
				// 		}
				// 	});
				// })
			}
		});
	}
}
