import { AfterViewInit, Component, ViewChild ,ViewEncapsulation} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute,Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { GalvaJobCardDetailComponent } from 'src/app/shared/dialogs/project/galva-job-card-detail/galva-job-card-detail.component';

export interface JobItem {
	material_type: string;
	id: string;
	status: string;
	project: string;
	remark: string	
	}

@Component({
  selector: 'app-galva-job-card',
  templateUrl: './galva-job-card.component.html',
  styleUrls: ['./galva-job-card.component.scss']
})
export class GalvaJobCardComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<JobItem>;
	nextPage:any = '';
	tableData:JobItem[]=[];
	displayedColumns: string[] = ['project', 'lot', 'release_date','action'];
	dataSource = new MatTableDataSource<JobItem>(this.tableData);
	
	// projectID:any;
	addJobPermission:any=true;
	projectDetail:any;
	sproject = new FormControl();

	projectList:any=[];
	projectSlug:any;

	constructor(private _snackBar:MatSnackBar,private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute,private router:Router) {
		this.spinner.show();
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
		
		// this.loadData()
		
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	loadData(){
		this.spinner.show()
		this.auth.getAPI('galva-job-card/?'+this.nextPage+'&project__slug='+this.projectSlug).subscribe(responce=>{
			this.dataSource.data = this.dataSource.data.concat(responce.results);
			if(responce.next != null){
				this.nextPage = responce.next.split('?')[1]
				this.loadData()
			}
			this.spinner.hide()
		})
	}

	// JobListView(){
	// 	if(this.sproject.value == null){
	// 		this._snackBar.open('Select Project First','', {duration: 5000, panelClass: ['redBOMSnackbar']});
	// 	}else{
	// 		this.router.navigate(['project/job-card/'+this.sproject.value+'/job-invoice'])	
	// 	}
	// }

	// editJob(i:number){

	// }
	deleteDialog(i:number){

	}

	// addJob(){}

	viewJobCard(jcdata:any){
		const dialogRef = this.dialog.open(GalvaJobCardDetailComponent,{
			width:'100%',
			data:{
				jcdata:jcdata
			}
		})
		dialogRef.afterClosed().subscribe(result=>{
			console.log(result, 'job card detail dialog viewwww')
		})
	}

	applyFilter(value: any | null){
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

	projectBom(data:any){
		this.router.navigate(['/project/galva-job-card/list/'+data])	
	}
}