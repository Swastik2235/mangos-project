import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogModule } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { PackagingDetailComponent } from 'src/app/shared/dialogs/project/packaging-detail/packaging-detail.component';


export interface PackagingItem {
	id:number;
	date: string;
	project: string;
	vehicle: string;
	driver : string;
	transporter : string;
	prepared : string;
	checked : string;
	item : string;
	
	}

@Component({
	selector: 'app-packaging',
	templateUrl: './packaging.component.html',
	styleUrls: ['./packaging.component.scss']
})
export class PackagingComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<PackagingItem>;
	tableData:PackagingItem[]=[];
	dataSource = new MatTableDataSource<PackagingItem>(this.tableData);
	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['date','project', 'vehicle', 'transporter', 'prepared', 'checked', 'item','action'];
	selection = new SelectionModel<PackagingItem>(true, []);
	
	
	projectList:any=[];
	bomData:any = [];
	nextPage='';
	projectSlug:any;
  	sproject = new FormControl();
  	error:any;
	constructor(private _snackBar:MatSnackBar,private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute,private router:Router) {
		// this.dataSource = new PackagingDataSource();
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
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

		
		this.auth.getAPI('project/').subscribe(result=>{
			this.projectList = result['results']
			
		})
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

	selectedClumn(){
		console.log(this.selection.selected,'111111111111')
	}

	loadData(){
		
		this.auth.getAPI('dispatch/?'+this.nextPage+'&project__slug='+this.projectSlug).subscribe(result=>{
			console.log(result['results'])
			this.dataSource.data = this.dataSource.data.concat(result.results);
			if(result.next != null){
				this.nextPage = result.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
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

	JobListView(){
		if(this.sproject.value == null){
			this._snackBar.open('Select Project First','', {duration: 5000, panelClass: ['redBOMSnackbar']});
		}else{
			// this.router.navigate[]
			this.router.navigate(['project/packaging/invoice/'+this.sproject.value])	
			// [routerLink]="['/project/packaging/invoice/' ]"
		}
	}

	importBomFile(){
		// const dialogRef = this.dialog.open(ImportBomFormComponent, {
		// 	width:'25%',
		// 	data:{
		// 		projects:this.projectList
		// 	}
		// })
	}

	projectBom(data:any){
		this.router.navigate(['/project/packaging/'+data])	
	}

	viewJobCard(jcdata:any){
		const dialogRef = this.dialog.open(PackagingDetailComponent,{
			width:'100%',
			height:"80%",
			data:{
				jcdata:jcdata
			}
		})
	}

	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",

			data:{
				title: 'Bom',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('dispatch/'+ id,{'status':'Delete'} ).subscribe(responce=>{
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
