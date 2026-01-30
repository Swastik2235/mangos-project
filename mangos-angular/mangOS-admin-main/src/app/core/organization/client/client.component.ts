import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';

export interface ClientItem {
	id: number;
	description: string;
	order_status : string;
		items : number;
	}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<ClientItem>;

	tableData: ClientItem[]=[];
	displayedColumns: string[] = ['logo', 'name','email','phone','city','action'];
	dataSource = new MatTableDataSource<ClientItem>(this.tableData);
	
	userPermissions :any=[]
	addClientPermission =false;
	editClientPermission = false;
	deleteClientPermission = false;
	viewClientPermission = false;

	nextPage='';

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
		this.userPermissions = localStorage.getItem('userPermissions')
		//console.log(this.userPermissions)
		if(this.userPermissions.includes("client.add_client")){
			this.addClientPermission = true
		}
		if(this.userPermissions.includes("client.change_client")){
			this.editClientPermission = true
		}
		if(this.userPermissions.includes("client.delete_client")){
			this.deleteClientPermission = true
		}
		if(this.userPermissions.includes("client.view_client")){
			this.viewClientPermission = true
		}
	}


	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Client',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('client/'+ id +'/',{'status':'Inactive'}).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
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

	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}
	loadData(){
		this.auth.getAPI('client/?'+this.nextPage).subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.nextPage = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
		})
	}
}
