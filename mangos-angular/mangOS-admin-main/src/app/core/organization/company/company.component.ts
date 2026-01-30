import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';

export interface CompanyItem {
	id: number;
	description: string;
	order_status : string;
		items : number;
	}

@Component({
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<CompanyItem>;

	tableData: CompanyItem[]=[];
	displayedColumns: string[] = ['logo', 'name','email','phone','city','action'];
	dataSource = new MatTableDataSource<CompanyItem>(this.tableData);
	
	userPermissions :any=[]
	addCompanyPermission =false;
	editCompanyPermission = false;
	deleteCompanyPermission = false;
	viewCompanyPermission = false;

	nextPage='';

	constructor(private auth:AuthenticationService,private spinner: NgxSpinnerService,public dialog: MatDialog) {
		this.spinner.show()
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		console.log(this.table, 'tterer');
		if(this.table != undefined){
			this.table.dataSource = this.dataSource;
		}
	}
	ngOnInit(){
		this.loadData()
		this.userPermissions = localStorage.getItem('userPermissions')
		//console.log(this.userPermissions)
		if(this.userPermissions.includes("company.add_company")){
			this.addCompanyPermission = true
		}
		if(this.userPermissions.includes("company.change_company")){
			this.editCompanyPermission = true
		}
		if(this.userPermissions.includes("company.delete_company")){
			this.deleteCompanyPermission = true
		}
		if(this.userPermissions.includes("company.view_company")){
			this.viewCompanyPermission = true
		}
	}


	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Company',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('company/'+ id +'/',{'status':'Inactive'}).subscribe(responce=>{
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
		this.auth.getAPI('company/?'+this.nextPage).subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.nextPage = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
		})
	}
}
