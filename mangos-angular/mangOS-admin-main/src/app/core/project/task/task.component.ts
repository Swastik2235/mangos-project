import { AfterViewInit, Component, ViewChild ,ViewEncapsulation} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';


export interface TaskItem {
	id: number;
	description: string;
	order_status : string;
	items : number;
}
@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	animations: [
		trigger('detailExpand', [
		  state('collapsed', style({height: '0px', minHeight: '0'})),
		  state('expanded', style({height: '*'})),
		  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
	encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<TaskItem>;
	//dataSource: TaskDataSource;
	tableData: TaskItem[]=[];
	dataSource = new MatTableDataSource<TaskItem>(this.tableData);

	// Expand table row------>
	expandedElement : TaskItem[] | null = [];
	
	isExpanded = false;
	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['title', 'start','finish'];
	projectName:any = null;
	projectDetail:any='';

	subDataList:any = []
	subTaskList:any = []
	constructor(private auth:AuthenticationService,private spinner: NgxSpinnerService,private router : Router, private activeRoute : ActivatedRoute) {
	
		
	}
	ngOnInit(){
		this.projectName = this.activeRoute.snapshot.paramMap.get('slug')
		this.loadData()
	}
	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	loadData(){
		this.auth.getAPI('project/'+this.projectName).subscribe(responce=>{
			this.projectDetail = responce
			// console.log(this.projectDetail)
			this.table.dataSource = this.projectDetail.project_task.filter((task:any)=>task.parent == null)
			// this.spinner.hide()
			// this.people = responce.project_people
			// this.peopleCount = responce.project_people.length
			this.subDataList = this.projectDetail.project_task.filter((subTask:any)=>subTask.parent != null)
		})
	}

	subtaskFilter(id:number){
		this.subTaskList = this.subDataList.filter((subTask:any)=>subTask.parent == id)
	}

	
}
