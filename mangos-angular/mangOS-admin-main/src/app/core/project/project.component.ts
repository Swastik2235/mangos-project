import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {

	btnNum :number=1;
	projectData:any = [];
	projectList:any = [];
	fileUrl:any;
	nextPage='';

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

	constructor(private auth:AuthenticationService,private spinner: NgxSpinnerService) {
		this.spinner.show()
		this.loadData()
	}

	ngOnInit(): void {
	}

	loadData(){
		this.auth.getAPI('project/?'+this.nextPage).subscribe(responce=>{
			this.projectData= this.projectData.concat(responce.results);
			if(responce.next != null){
				this.nextPage = responce.next.split('?')[1]
				this.loadData()
			}
			this.filterData('All',1)
			this.spinner.hide()
		})
	}

	filterData(status:string,btn:number){
		this.btnNum = btn;
		if(status!='All'){
			this.projectList = this.projectData.filter((pro:any )=>
				pro.status == status
			)
		}else{
			this.projectList = this.projectData
		}
	}

	downloadFile(fileType:string){
		console.log(fileType)
		this.auth.getAPI('export/?type='+fileType).subscribe(res=>{
			
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
