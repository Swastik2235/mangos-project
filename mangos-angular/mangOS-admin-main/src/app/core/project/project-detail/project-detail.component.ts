import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormBuilder,Validators,FormControl} from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import * as Highchart from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { AuthenticationService } from 'src/app/service/authentication.service';
import { TaskFormComponent } from 'src/app/shared/dialogs/project/task-form/task-form.component';
import ganttChart from 'highcharts/modules/gantt';
import * as Highcharts from 'highcharts/highcharts-gantt.js';
ganttChart(Highchart)

export interface Message {
	message : string
	type:string
  }

@Component({
	selector: 'app-project-detail',
	templateUrl: './project-detail.component.html',
	styleUrls: ['./project-detail.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit {

	projectName:any = '';
	projectDetail:any = {};
	taskList:any =[];
	taskId:any;
	subTaskList:any=[];
	eventList:any=[];
	defaultId:any=[];
	chatUserToken:any;
	loginUser:any=[];
	jobcards:any=[];
	today:string;
	week:string;
	chartdata:any=[];
	oldChatData:any=[];
	datesToHighlight :any=[];

	
	// ["2022-01-22T18:30:00.000Z", "2022-01-22T18:30:00.000Z", "2022-01-24T18:30:00.000Z", "2022-05-28T18:30:00.000Z", "2022-01-24T18:30:00.000Z", "2022-01-23T18:30:00.000Z", "2022-01-22T18:30:00.000Z", "2022-05-25T18:30:00.000Z"];
	progress = [
		{'name': 'Consignment Initiated','value':0,'status':false},
		{'name': 'Client Onboarding','value':1,'status':false},
		{'name': 'Resource Allocation','value':2,'status':false},
		{'name': 'Production Control','value':3,'status':false},
		{'name': 'Machine Process','value':4,'status':false},
		{'name': 'Quality Assurance','value':5,'status':false},
		{'name': 'Dispatched Initiated','value':6,'status':false},
		{'name': 'Value stream','value':7,'status':false}
	]


	chatForm = this.fb.group({
		message :null,
	});

	wsm : WebSocketSubject<any>;

	chartOption: any={
		chart:{type:'gantt'},
			title: {
				text: 'Project management with Subtasks'
			},
			xAxis: {
			},
			yAxis: {
				uniqueNames: true
			},
			series: [{
				name: 'Project 1',
				type:'gantt',	
				data:[],
			}]
	}
	// Charts---->
	// Pie Chart
	pieChartOption:any = {   
		chart : {
		plotBorderWidth: null,
		plotShadow: false,
		height:100,
		width:100,
		},
		title : {
			text: 'Product Sale'   
		},
		tooltip : {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions : {
			pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: true,
				format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
				style: {
					color: ('green')||
					'black'
				}
			}
			}
		},
		series : [{
			type: 'pie',
			name: 'Browser share',
			data: [
			['Item-1',   45.0],
			['Item-2',       26.8],
			{
				name: 'Item-3',
				y: 12.8,
				sliced: true,
				selected: true
			},
			['Item-4',    8.5],
			['Item-5',     6.2],
			['Item-6',      0.7]
			]
		}]
	};

	constructor(private fb: FormBuilder,private auth:AuthenticationService,private spinner: NgxSpinnerService,private router : Router, private activeRoute : ActivatedRoute,public dialog: MatDialog) {
		this.spinner.show()
		
		// Highcharts.chart('pieChart',this.pieChartOption);
		this.wsm = new WebSocketSubject(this.auth.socketUrl);
		this.loginUser = JSON.parse(localStorage.getItem('userdata')|| '')
		const now = new Date;
		this.today =now.toISOString();
		this.week = new Date(now.setDate(now.getDate() + 7)).toISOString();
		// console.log(this.loginUser,'uuuuuu')

	}
	ngOnInit(): void {
		this.projectName = this.activeRoute.snapshot.paramMap.get('slug')
		this.loadData()
		let today = new Date(),
		day = 1000 * 60 * 60 * 24;
		// Utility functions;
		
		
		// Set to 00:00:00:000 today
		today.setUTCHours(0);
		today.setUTCMinutes(0);
		today.setUTCSeconds(0);
		today.setUTCMilliseconds(0);
		let td=today.getTime();
		this.chartdata= [{
			id: 'a',
			name: 'Planning',
			start: td,
			end: td + (20 * day)
		}, {
			id: 'r',
			name: 'Requirements',
			parent: 'a',
			start: td,
			end: td + (5 * day)
		}, {
			id: 'b',
			name: 'Design',
			dependency: 'r',
			parent: 'a',
			start: td + (3 * day),
			end: td + (20 * day)
		}, {
			id: 'l',
			name: 'Layout',
			parent: 'b',
			start: td + (3 * day),
			end: td + (10 * day)
		}, {
			name: 'Graphics',
			parent: 'b',
			dependency: 'l',
			start: td + (10 * day),
			end: td + (20 * day)
		}, {
			id: 'c',
			name: 'Develop',
			start: td + (5 * day),
			end: td + (30 * day)
		}, {
			id: 'u',
			name: 'Create unit tests',
			dependency: 'r',
			parent: 'c',
			start: td + (5 * day),
			end: td + (8 * day)
		}, {
			id: 'implement',
			name: 'Implement',
			dependency: 'u',
			parent: 'c',
			start: td + (8 * day),
			end: td + (30 * day)
		}]
		// 	Highchart.ganttChart('container', {
			// 		title: {
				//     text: 'Project Task management'
				//  	 },
				// //   chart: { },
				// 		series: [
					// 			{
						// 			name: 'Project 1',
	// 			type: 'gantt',
	// 			data: [
	// 				{
	// 				id: 's',
	// 				name: 'Start prototype',
	// 				start: td-(4*day),
	// 				end: td+(1*day)
	// 				}, {
	// 				id: 'b',
	// 				name: 'Develop',
	// 				start: td-(2*day),
	// 				end: td,
	// 				dependency: 's'
	// 				}, {
	// 				id: 'a',
	// 				name: 'Run acceptance tests',
	// 				start: td,
	// 				end: td+(2*day),
	// 				dependency: 'b'
	// 				},
	// 				{
	// 				name: 'Test prototype',
	// 				start: td+(2*day),
	// 				end: td+(3*day),
	// 				dependency: 'a'
	// 				}
	// 			]
	// 			}]
	// 	});
        // this.chartOption.series[0].data = data
		// Highcharts.ganttChart('container1',this.chartOption);
	}
	
	loadData(){
		this.auth.getAPI('project/'+this.projectName).subscribe(responce=>{
			// console.log(responce,'rrrrrrrrr')
			this.taskList = []
			this.projectDetail = responce
			this.taskList = this.projectDetail.project_task.filter((task:any)=> task.parent == null)
			for (let i in this.taskList){
				// console.log(i ,this.taskList[i].start)
				this.datesToHighlight.push(this.taskList[i].start)
			}
			// console.log(this.datesToHighlight,'dddddddddddd')
			this.eventList = this.projectDetail.project_event
			this.defaultId = this.taskList[this.taskList.length-1];
			this.subTaskList = this.projectDetail.project_task.filter((task:any)=> task.parent == this.defaultId.id)
			console.log(this.subTaskList,"subtask")
			for(let i=0;i<=responce.progress;i++){
				this.progress[i].status=true
			}
			// this.spinner.hide()
			this.oldChat();
			this.chatsocket();
			this.jobCardList(this.projectDetail)
			this.spinner.hide()
			console.log(this.projectDetail.project_task)
			console.log(this.chartdata)
			this.chartOption.series[0].data = this.chartdata
			Highcharts.ganttChart('container1',this.chartOption);
		})
		
	}

	jobCardList(pdata:any){
		
		this.auth.getAPI('job-card?project='+pdata.id).subscribe(result=>{
			this.jobcards = result.results;
			// this.spinner.hide()
		})
	}

	addTask(){
		let addDialog = this.dialog.open(TaskFormComponent,{
			width: "50%",
			data : {
				title : "Add Task",
				projectId: this.projectDetail.id
			}
		});
		addDialog.afterClosed().subscribe(responce=>{
			if(responce){
				this.taskList.push(responce)
			}
		})
	}

	addSubTask(){
		let addDialog = this.dialog.open(TaskFormComponent,{
			width: "50%",
			data : {
				title : "Add Sub Task",
				projectId: this.projectDetail.id,
				taskId: this.taskId,
				//addTax : this.addTaxPermission
			}
		});
		addDialog.afterClosed().subscribe(responce=>{
			if(responce){
				this.subTaskList.push(responce)
				//console.log(responce,'subbbbbbbbbb')
			}
		})		
	}
	filterSubTask(id:number){
		this.taskId = id;
		this.subTaskList = this.projectDetail.project_task.filter((task:any)=> task.parent == this.taskId)
		console.log(this.subTaskList,"onclick")
		// this.loadData()
	}
	
	// Chat functionality---------->
	chatsocket(){
		this.chatUserToken = localStorage.getItem('token');
		this.wsm = webSocket(this.auth.socketUrl+'/ws/project/'+this.projectDetail.id+'/'+this.chatUserToken+'/')
		this.wsm.subscribe({
			next:(data) =>{
				this.oldChatData.push({"sender":data.senders.id,"sender_detail":data.senders,"message":data.message})
			}
		})
	}


	get f() { return this.chatForm.controls; }
	sendMessage(){
		//console.log(this.chatForm.value)
		var messageeeeee= this.wsm.next({'message':this.f.message.value, 'type':'message'})
		//console.log(messageeeeee)
		this.chatForm.reset()
		
	}
	
	oldChat(){
		//console.log()
		this.auth.getAPI('chat/?project='+this.projectDetail.id).subscribe(data=>{
			this.oldChatData = data.results
			//console.log(data.results,'cccccccccc')
		})
	}
	//End Functionality-------->


	myDateEvent(event:any){
		var selectedDate = formatDate(event,'YYYY-MM-dd','en')
		this.today=selectedDate
		this.week=selectedDate
		// this.eventList = this.projectDetail.project_event.filter((event:any)=>formatDate(event.date,'YYYY-MM-dd','en') == selectedDate)
		this.taskList = this.projectDetail.project_task.filter((event:any)=>event.parent == null && formatDate(event.start,'YYYY-MM-dd','en') == selectedDate)
		if(this.taskList.length>0){
		this.subTaskList = this.projectDetail.project_task.filter((event:any)=>event.parent == this.taskList[this.taskList.length-1].id)}
	}

	dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
		// Only highligh dates inside the month view.
		// this.datesToHighlight.push('2022-05-12')
		// console.log(this.datesToHighlight,'jjjjjjjjjjjj');
		if (this.datesToHighlight){
		if (view === 'month') {
			const date = cellDate.getDate();
			var currentDate = new Date().getDate()
			// console.log(this.taskList,'ppppppppp')
			const highlightDate = this.datesToHighlight
        .map((strDate:any) => new Date(strDate))
        .some((d:any) => d.getDate() === cellDate.getDate() && d.getMonth() === cellDate.getMonth() && d.getFullYear() === cellDate.getFullYear());
			//console.log(date,'ddddddddd')
			// Highlight the 1st and 20th day of each month.
			return [(date === currentDate ) ? 'date-class' : '' , highlightDate ? 'special-date' : ''];
		}}
	
		return '';
	}

	

	

}
