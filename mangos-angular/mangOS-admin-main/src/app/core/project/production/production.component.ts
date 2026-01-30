import { AfterViewInit, Component, ViewChild,ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource,MatTable } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';

// import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component'
import { PackagingFormComponent } from 'src/app/shared/dialogs/project/packaging-form/packaging-form.component';
import { ConfirmComponent } from 'src/app/shared/dialogs/default/confirm/confirm.component';
import { NgxSpinnerService } from 'ngx-spinner';


export interface ProductionItem {
		id:number;
		
		project: string;
		section: string;
		mark: string;
		tower : string;
		length : string;
		width : string;
		unit_weight : string;
		piece_weight : string;
		quantity : string;
		number : string;
		total_weight : string;
		total_quantity : string;
		note : string;
		weight : string;
		jobitems:any;
	}

@Component({
	selector: 'app-production',
	templateUrl: './production.component.html',
	styleUrls: ['./production.component.scss'],
	// encapsulation:ViewEncapsulation.None
})
export class ProductionComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<ProductionItem>;
	tableData:ProductionItem[]=[];
	dataSource = new MatTableDataSource<ProductionItem>(this.tableData);

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['pkg','mark', 'number', 'section', 'c-quantity','c-weight','c-balanceQty','c-balanceWt','c-select','f-quantity','f-weight','f-balanceQty','f-balanceWt','f-select','g-quantity','g-weight','g-balanceQty','g-balanceWt','g-select'];
	// 'f-quantity','f-weight','f-balanceQty','f-balanceWt','g-quantity','g-weight','g-balanceQty','g-balanceWt
	displayedHeader = ['Production Entry','Cutting','Fabrication','Galvanizing']


	displayedColumns2=['unit_weight']
	selection = new SelectionModel<ProductionItem>(true, []);
	
	
	projectList:any=[];
	bomData:any = [];
	nextPage='';
	projectSlug:any;
  	sproject = new FormControl();
  	error:any;
	cuttingItemList:any=[]
	fabItemList:any=[]
	galItemList:any=[]
	packItemList:any=[]
	colour='primary'

	constructor(private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute,private router:Router,private _snackBar:MatSnackBar) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
		this.auth.getAPI('project/').subscribe(result=>{
			this.projectList = result['results']
			
		})
		this.projectSlug = this._route.snapshot.paramMap.get('slug')
		if(this.projectSlug==null){
			if(localStorage.getItem('selectedproject')){
				this.projectSlug=localStorage.getItem('selectedproject')
			this.sproject.setValue(this.projectSlug);
			this.projectBom(this.projectSlug)
			}
			else{
				this.projectSlug = ''
			}
		}else{
	  		localStorage.setItem('selectedproject',this.projectSlug)
			this.sproject.setValue(this.projectSlug);
			this.loadData()
		}
		this.spinner.show()
		// this.loadData()
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	

	doFilter = (value: any | null) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
		// this.selectedrow(this.selection.selected)
	}

	

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
		  this.selection.clear();
		  return;
		}
		this.selection.select(...this.dataSource.data);
		// this.selectedrow()
	}

	cuttingSelected(){
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	cuttingToggle() {
		// console.log(this.selection,'sssssssssss')
		if (this.cuttingSelected()) {
			this.selection.clear();
			return;
		  }
		this.selection.select(...this.dataSource.data);
	}
	
	

	getCutting(event:any,item:any){
		console.log('cut')
		if(event.checked == true){
			this.cuttingItemList.push(item.id)
		}else{
			const indexx = this.cuttingItemList.indexOf(item.id)
			this.cuttingItemList.splice(indexx,1)
		}
	}

	getfab(event:any,item:any){
		if(event.checked == true){
			this.fabItemList.push(item.id)
		}else{
			const indexx = this.fabItemList.indexOf(item.id)
			this.fabItemList.splice(indexx,1)
		}
	}

	getGal(event:any,item:any){
		if(event.checked == true){
			this.galItemList.push(item.id)
		}else{
			const indexx = this.galItemList.indexOf(item.id)
			this.galItemList.splice(indexx,1)
		}
	}

	getPackaging(event:any,item:any){
		// console.log("hi")
		if(event.checked == true){
			this.packItemList.push(item)
		}else{
			const indexx = this.packItemList.indexOf(item.id)
			this.packItemList.splice(indexx,1)
		}
	}

	updatePackaging(){
		if(this.packItemList.length>0){
			
			const dialogRef = this.dialog.open(PackagingFormComponent, {
				width:'80%',
				data:{
					itemList:this.packItemList,
					projectList : this.projectList
				}
			})
			dialogRef.afterClosed().subscribe(responce=>{
				if (responce){
					this._snackBar.open('Packaging Data Updated','', {duration: 5000, panelClass: ['redBOMSnackbar']});
				}
			})
		}else{
			
		}
	}

	loadData(){
		this.auth.getAPI('jobcard-detail/?'+this.nextPage+'&project__slug='+this.projectSlug).subscribe(result=>{
			this.dataSource.data = this.dataSource.data.concat(result.results);
			if(result.next != null){
				this.nextPage = result.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
			console.log(result.results)
		})
		
	}

	

	applyFilter(value: any | null){
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	downloadFile(fileType:string){
		this.auth.getAPI('export/?type='+fileType).subscribe(res=>{
			
			if(fileType=='pdf'){
				window.open(res.results.file,'_blank')
			}else{
				window.location.href = res.results.file
			}
		})
	}

	projectBom(data:any){
		this.router.navigate(['/project/production/'+data])	
	}

	getdata(data:any)
	{
		return new MatTableDataSource<any>(data);
	}

	updateItem(data:any){
		const updateType = data
		if(this.cuttingItemList.length>0 || this.fabItemList.length>0 ||  this.galItemList.length>0){
			const dialogRef = this.dialog.open(ConfirmComponent, {
				width:'25%',
			})
			dialogRef.afterClosed().subscribe(result => {
				if(result == 'yes'){
					if(updateType == 'Cutting'){
						data ={
							'type':'Cutting',
							'items':this.cuttingItemList
						}
						this.auth.postAPI('bulk-update-jobitem/',data).subscribe(res=>{
							this._snackBar.open('Cutting Data Updated','', {duration: 5000, panelClass: ['greenTSnackbar']});
							this.loadData()
							this.dataSource._updateChangeSubscription()
						})
						
						
					}else if (updateType == 'Fabrication'){
						data ={
							'type':'Fabrication',
							'items':this.fabItemList
						}
						this.auth.postAPI('bulk-update-jobitem/',data).subscribe(res=>{
							this._snackBar.open('Fabrication Data Updated','', {duration: 5000, panelClass: ['greenTSnackbar']});
						})
						
					}else if(updateType == 'Galvanizing'){
						data ={
							'type':'Galvanizing',
							'items':this.galItemList
						}
						this.auth.postAPI('bulk-update-jobitem/',data).subscribe(res=>{
							// console.log(res)
							this._snackBar.open('Galvanizing Data Updated','', {duration: 5000, panelClass: ['greenTSnackbar']});
						})
					}
				}
			});
		}else{
			this._snackBar.open('Please Select Items First','', {duration: 5000, panelClass: ['redBOMSnackbar']});
		}
	}
}
