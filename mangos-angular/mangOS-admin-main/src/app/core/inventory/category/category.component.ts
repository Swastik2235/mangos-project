import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
// for dilaogs
import { CategoryFormComponent } from 'src/app/shared/dialogs/inventory/category-form/category-form.component';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component';


export interface CategoryItem {
	id: number;
	name: string;
	description: string;
	timestamp : string;
	utimestamp : string
	
  }

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements AfterViewInit {

	//for permissions-------->
	userPermissions :any=[]
	viewCat = false
	addCat = false
	editCat = false
	deleteCat = false
	delete:string=''

	//for error --->
	error:any;
	nextPage:any = '';
	//table data---------->
	tableData:CategoryItem[]=[];
	displayedColumns: string[] = ['id', 'name', 'description','action'];
	dataSource = new MatTableDataSource<CategoryItem>(this.tableData);
	
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	//@ViewChild(MatTable) table!: MatTable<any>;
	

	constructor(private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService) {
		this.spinner.show();
	}

	ngOnInit(){
		this.loadData()
		this.userPermissions = localStorage.getItem('userPermissions')
		if(this.userPermissions.includes("category.add_category")){
			this.addCat = true
		}
		if(this.userPermissions.includes("category.change_category")){
			this.editCat = true
		}
		if(this.userPermissions.includes("category.delete_category")){
			this.deleteCat = true
		}
		if(this.userPermissions.includes("category.view_category")){
			this.viewCat = true
		}
	}
	
	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}
	// filter function ------------>
	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	addCategory(){
		let addDialog = this.dialog.open(CategoryFormComponent,{
			width: "50%",
			data : {
				title : "Add New Category",
				addCat : this.addCat
			}
		});
		addDialog.afterClosed().subscribe(responce=>{
			
			if(responce){
				this.dataSource.data.push(responce)
				this.dataSource._updateChangeSubscription()
			}
		})
	}

	editCategory(indx:number){
		let editDialog = this.dialog.open(CategoryFormComponent,{
			width: "50%",
			data : {
				title : "Edit",
				cat_data : this.dataSource.data[indx]
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
				title: 'Category',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.deleteAPI('category/'+ id ).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
					this.error = error.error.detail
					//console.log(error.error.detail,'eeeeeeeeeeeeeeeeee')
				})
			}
		});
	}

	
	loadData(){
		this.auth.getAPI('category/').subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.nextPage = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
		})
	}


	// downloadFile(fileType:string){
	// 	console.log(fileType)
	// }
	downloadFile(fileType:string){
		console.log(fileType)
		this.auth.getAPI('export-category/?type='+fileType).subscribe(res=>{
			
			// this.fileUrl = res.results.file
			if(fileType=='pdf'){
				window.open(res.results.file,'_blank')
			}else{
				window.location.href = res.results.file
			}
			console.log(res)
		})
	}
}

