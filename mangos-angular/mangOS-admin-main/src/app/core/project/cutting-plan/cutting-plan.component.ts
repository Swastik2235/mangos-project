import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatTable } from '@angular/material/table';
import { MatTableDataSource,MatTable } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
// import { CuttingPlanDataSource, CuttingPlanItem } from './cutting-plan-datasource';

export interface CuttingPlanItem {
	id:number;
	project: string;
	section: string;
	mark: string;
	tower_quantity : string;
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
}

@Component({
	selector: 'app-cutting-plan',
	templateUrl: './cutting-plan.component.html',
	styleUrls: ['./cutting-plan.component.scss']
})
export class CuttingPlanComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<CuttingPlanItem>;

	tableData:CuttingPlanItem[]=[];
	dataSource = new MatTableDataSource<any>(this.tableData);
	displayedColumns = ['sn', 'section','grade','unit_wt','width','length','total_qty','total_wt','remark'];

	projectList:any=[];
	nextPage='';
	project__slug='';
	projectSlug:any;
  	sproject = new FormControl();

	constructor(private spinner: NgxSpinnerService,private auth : AuthenticationService,private _route:ActivatedRoute, private router:Router) {
		this.spinner.show()
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
		this.projectSlug = this._route.snapshot.paramMap.get('id')
		console.log(this.projectSlug, 'idddddddddd')
		if(this.projectSlug==null){
			this.projectSlug = 1
		}else{
			this.sproject.setValue(this.projectSlug);
		}
		this.auth.getAPI('project/').subscribe(result=>{
			this.projectList = result['results']
			this.sproject.setValue(this.projectSlug);
		})
		this.loadCuttingPlan()
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}


	applyFilter(value: any | null){
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	loadCuttingPlan(){
		// if(this.projectSlug){
		this.auth.getAPI('cutting-plan/?project='+this.projectSlug).subscribe(res=>{
			console.log(res, 'cutting-plan')
			this.projectList = this.projectList.concat(res.results)
			this.dataSource.data = res.results
			// if(res.next != null){
			// 	this.nextPage = res.next.split('?')[1]
			// 	this.loadProjects()
			// }
			this.spinner.hide()
		})
		// }else{
		// 	this.auth.getAPI('cutting-plan/').subscribe(res=>{
		// 		console.log(res, 'cutting-plan')
		// 		this.projectList = this.projectList.concat(res.results)
		// 		this.dataSource.data = res.results
		// 		// if(res.next != null){
		// 		// 	this.nextPage = res.next.split('?')[1]
		// 		// 	this.loadProjects()
		// 		// }
		// 		this.spinner.hide()
		// 	})
		// }
		
		// 
	}

	

	projectSelect(data:any){
		this.router.navigate(['/project/cutting-plan/'+data])
	}
}
