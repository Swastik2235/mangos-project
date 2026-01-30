import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormBuilder,Validators,FormControl} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PeopleFormComponent } from 'src/app/shared/dialogs/project/people-form/people-form.component';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-project-setting',
	templateUrl: './project-setting.component.html',
	styleUrls: ['./project-setting.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ProjectSettingComponent implements OnInit {
	
	projectDetail:any = {};
	projectId:any = '';
	people:any=[]
	peopleCount = 0


	loginUser="";
	///notificationForm
	notificationForm = this.fb.group({
		follow:false,
		event:false,
		report:false,
	});

	

	constructor(private fb: FormBuilder,private auth:AuthenticationService,private spinner: NgxSpinnerService,private router : Router, private activeRoute : ActivatedRoute,public dialog: MatDialog) { 
		this.spinner.show()
		this.loginUser = JSON.parse(localStorage.getItem('userdata')|| '')
		console.log(this.loginUser)
	}

	ngOnInit(): void {
		this.projectId = this.activeRoute.snapshot.paramMap.get('id')
		// this.notificationForm.controls["project"].setValue(this.projectId)
		// this.notificationForm.controls["employee"].setValue(this.loginUser)
		this.loadData()
	}

	get f() { return this.notificationForm.controls; }
	loadData(){
		this.auth.getAPI('project/'+this.projectId).subscribe(responce=>{
			this.projectDetail = responce
			console.log(responce)
			this.spinner.hide()
			this.people = responce.project_people
			this.peopleCount = responce.project_people.length
			
		})
		// this.auth.getAPI('notification/project').subscribe(res=>{
		// 	console.log(res,'nnnnnnnnnnnnnnn')
		// })
		
		this.auth.getAPI('notification/?project='+this.projectId+"&employee="+this.loginUser).subscribe(res=>{
			//console.log(res,'nnnnnnnnnnnnnnn')
			let data = res.results[0]
			this.f.follow.setValue(data.follow)
			this.f.event.setValue(data.event) 
			this.f.report.setValue(data.report)
		})
	}

	addPoeple(){
		let addDialog = this.dialog.open(PeopleFormComponent,{
			width: "50%",
			data : {
				title : "Add People",
				projectId: this.projectId
				//addTax : this.addTaxPermission
			}
		});
		addDialog.afterClosed().subscribe(responce=>{
			if(responce){
				this.people.push(responce)
			}
		})
	}

	notificationSetting(){
		console.log(this.notificationForm.value)
		this.auth.patchAPI('notification/',this.notificationForm.value).subscribe(data=>{
			console.log(data,'4444444444')
		})
	}

}
