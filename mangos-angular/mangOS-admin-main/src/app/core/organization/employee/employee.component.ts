import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';


export interface EmployeeItem {
	id: number;
	description: string;
	order_status : string;
  	items : number;
}

	@Component({
	selector: 'app-employee',
	templateUrl: './employee.component.html',
	styleUrls: ['./employee.component.scss']
	})
export class EmployeeComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<EmployeeItem>;

	tableData: EmployeeItem[]=[];
	displayedColumns: string[] = ['user_detail.username','company','role','department','action',];
	dataSource = new MatTableDataSource<EmployeeItem>(this.tableData);
	

	addEmployeePermission =true;
	editEmployeePermission = true;
	deleteEmployeePermission = true;
	viewEmployeePermission = true;

	nextPage='';
	constructor(private auth:AuthenticationService,private spinner: NgxSpinnerService,public dialog: MatDialog) {
		this.spinner.show()
		
	}
	ngOnInit(){
		this.loadData()
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	loadData(){
		this.auth.getAPI('employee/?'+this.nextPage).subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.nextPage = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
		})
	}

	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Employee',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('employee/'+ id +'/',{'status':'Inactive'}).subscribe(responce=>{
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

}
