import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormBuilder,Validators,FormControl,FormArray} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { PeopleFormComponent } from 'src/app/shared/dialogs/project/people-form/people-form.component';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ProjectFormComponent implements OnInit {

	projectCreateForm = this.fb.group({
		company : [null,Validators.required],
		client : [null,Validators.required],
		service : [null,Validators.required],
		title : [null,Validators.required],
		consignment : [null,Validators.required],
		content : [null,Validators.required],
		machine : [],
		operation : [null,Validators.required],
		workflow : [null,Validators.required],
		//client:this.fb.array([this.fb.group({ id:null,})]),
		//people:this.fb.array([this.fb.group({ id:[null,Validators.required],})]),
		file:null,
	});

	title = "Create Project"
	projectSaveBtn = "Create Project"
	machines:any = [];
	operations:any = [];
	// for client in template--->
	// clientData:any = []; 
	// for poeple in template--->

	projectName:any=null;
	arr:any=[];
	machineL:any=[]
	peopleList:any=[];
	// clientList:Array<number> = [];
	project_people:any=[];
	company:any = [];
	client:any = [];
	service:any = [];
	workFlowList:any = [];
	workFlow:any=[];
	projectFileList:any = [];
	myProjectFiles :any=[];
	selectedService:any;
	fileName = '';

	removable = true;
	selectable = true;

	projectId:any;
	bomfile:any;
	bomfileName:any;
	createdProject:any;
	constructor(private fb: FormBuilder,private auth:AuthenticationService,private spinner: NgxSpinnerService,private router : Router,public dialog: MatDialog,private activeRoute : ActivatedRoute,private _snackBar: MatSnackBar) { 
		this.spinner.show()
	}

	ngOnInit(): void {
		this.auth.getAPI('machine/').subscribe(data=>{
			// this.machines = data.results
			this.machineL = data.results
		})

		this.auth.getAPI('operation/').subscribe(data=>{
			this.operations = data.results
		})

		this.auth.getAPI('company/').subscribe(data=>{
			this.company = data.results
		})

		this.auth.getAPI('client/').subscribe(data=>{
			this.client = data.results
		})

		this.auth.getAPI('service/').subscribe(data=>{
			this.service = data.results
		})

		this.auth.getAPI('workflow/').subscribe(data=>{
			this.workFlowList = data.results
		})

		this.projectName = this.activeRoute.snapshot.paramMap.get('slug')
		if(this.projectName != null){
			this.editProject(this.projectName );
			this.title = "Update Project "+ this.projectName;
			this.projectSaveBtn = "Update";
		}
		this.spinner.hide()

	}

	get pf() { return this.projectCreateForm.controls; }
	addProject(){
		//this.client.removeAt(0)
		// this.projectCreateForm.value['client'] = this.clientList;
		this.projectCreateForm.value['project_people'] = this.project_people;
		this.projectCreateForm.value['created'] = JSON.parse(localStorage.getItem('userdata') || '').id;
		if(this.projectCreateForm.value['machine']==null){
			this.projectCreateForm.value['machine']=[]
		}
		let data = {
			company : this.pf.company.value,
			client : this.pf.client.value,
			service : this.pf.service.value,
			title : this.pf.title.value,
			consignment : this.pf.consignment.value,
			content :  this.pf.content.value,
			machine :  this.pf.machine.value,
			operation :  this.pf.operation.value,
			workflow : this.pf.workflow.value,
			// client : this.clientList,
			created_by : JSON.parse(localStorage.getItem('userdata') || '').id,
			project_people : this.project_people,
			// project_file: [],
		}
		// for edit project
		if(this.projectName != null){
			
			// var mydata = [{'bom':this.bomfile},{'project_people':this.project_people},{'created':JSON.parse(localStorage.getItem('userdata') || '').id},{'client':this.clientList},{'workflow':this.pf.workflow.value},{'machine':this.pf.machine.value},{'company':this.pf.company.value},{'title':this.pf.title.value},{'consignment':this.pf.consignment.value},{'content':this.pf.content.value}]
			// if(!this.bomfile){
			// 	mydata.splice(0,1)
			// }
			this.auth.patchAPI('project/'+this.projectName+'/',this.projectCreateForm.value).subscribe(responce=>{
				this.createdProject = responce
				if(this.createdProject){
					if(this.bomfile != ''){
						this.auth.patchForm2('project/'+this.projectName+'/',[{'bom':this.bomfile}]).subscribe(result=>{
							console.log(result,'project update with bom fileeee')
						})
					}
					for(let i = 0;i < this.projectFileList.length;i++){
						if(!this.projectFileList[i]['id']){
							console.log(this.projectFileList[i])
							this.projectFileList[i].push({'project':this.createdProject['id']})
							this.auth.postForm2('file/',this.projectFileList[i]).subscribe(res=>{
								this.openSnackBar("Project Detail Updated")
								this.router.navigate(['project'])
							})
						}else{
							this.openSnackBar("Project Detail Updated")
							this.router.navigate(['project'])
						}
					}

				}
			})
		}else{
			console.log({title : this.projectCreateForm.value['title'],color:'#000000',company:this.projectCreateForm.value['company'],user:this.projectCreateForm.value['created']},'ppppppppppppppppppppppppppp',{file:this.projectFileList[0]})
			this.auth.postAPI('folder/',{title : this.projectCreateForm.value['title'],color:'#000000',company:this.projectCreateForm.value['company'],user:this.projectCreateForm.value['created']}).subscribe(res=>{
				// console.log('folder done')
				this.auth.postForm2('document/',[{'folder':res.id},this.projectFileList[0][0],{'user':this.projectCreateForm.value['created']},{'title':this.projectFileList[0][1].title.split('.')[0]},this.projectFileList[0][2],this.projectFileList[0][4],{'size':(this.projectFileList[0][3].size*0.000001).toFixed(4)}]).subscribe(result=>{
					// console.log('file done')
				  })
			})
			// console.log(this.projectCreateForm.value,{title : this.projectCreateForm.value['title'],color:'#000000',company:this.projectCreateForm.value['company'],user:this.projectCreateForm.value['created']},'sssssssssss')
			this.auth.postAPI('project/',this.projectCreateForm.value).subscribe(result=>{
				// console.log(responce,'ressssssssssss')
				this.openSnackBar("New Project Created")
				this.createdProject = result
				if(this.createdProject){
					if(this.bomfile != ''){
						this.auth.patchForm2('project/'+this.createdProject.slug+'/',[{'bom':this.bomfile}]).subscribe(result=>{
							console.log(result,'project update with bom fileeee')
						})
					}
					for(let i = 0;i < this.projectFileList.length;i++){
						this.projectFileList[i].push({'project':this.createdProject['id']})
						this.auth.postForm2('file/',this.projectFileList[i]).subscribe(res=>{
							this.router.navigate(['project'])
						})
					}
				}
			})
		}
		
	}

	// addClient(){
	// 	let addDialog = this.dialog.open(PeopleFormComponent,{
	// 		width: "50%",
	// 		data : {
	// 			title : "Add Client",
	// 			add:true,
	// 		}
	// 	});
	// 	addDialog.afterClosed().subscribe(responce=>{
	// 		if(responce){
	// 			this.clientData.push(responce[0])
	// 			this.clientList.push(responce[0].id)
	// 		}
	// 	})
	// }
	onSecvicechange(i:any){
		this.arr=[];
		this.machines=this.machineL
		for (var k in this.machines){
			if (i==this.machines[k]['service'])
				this.arr.push(this.machines[k]);
			}
		this.machines=this.arr;
	}
	addPeople(){
		let addDialog = this.dialog.open(PeopleFormComponent,{
			width: "50%",
			data : {
				title : "Add People",
				add:true,
				addPeople:true,
				//projectName: this.projectName
				//addTax : this.addTaxPermission
			}
		});
		addDialog.afterClosed().subscribe(responce=>{
			if(responce){
				this.peopleList.push({'user':responce.user[0],'role':responce.role})
				this.project_people.push({'user':responce.user[0].id,'role':responce.role})
			}
		})
	}

	onCompanyChange(event:any){
		this.workFlow = this.workFlowList.filter((work:any)=>work.company == event)
	}


	onFileDropped(event:any){
		if (event.target.files.length > 0) {
			const fileData = event.target.files;
			for(let i = 0; i < fileData.length;i++){
				this.fileName = fileData[i].name
				var extention = fileData[i].name.split('.')
				var fileExtention 
				if(extention[1] == 'jpg' || extention[1] == 'jpeg' || extention[1] == 'png'){
					fileExtention = 'Image'
				}else if (extention[1] == 'zip' || extention[1] =='json' || extention[1] =='xlsx' || extention[1] =='csv' ){
					fileExtention = 'Document'
				}else{
					fileExtention = 'Other'
				}
				this.projectFileList.push([{file:fileData[i]},{'title':fileData[i].name},{'name':fileData[i].name},{'size':fileData[i].size},{'extension':fileExtention}])
				
			}
		}
		console.log(this.projectFileList,'project file')
	}

	importBomFile(event:any){
		this.bomfile = event.target.files[0]
		for(let i = 0; i < event.target.files.length;i++){
			this.bomfileName = event.target.files[i].name
		}
	}
	


	// Edit Project ----------->
	editProject(name:string){
		this.spinner.show();
		this.auth.getAPI('project/'+name+'/').subscribe(responce=>{
			this.projectId = responce.id
			this.pf.company.setValue(responce.company)
			this.pf.client.setValue(responce.client)
			this.pf.service.setValue(responce.service)
			this.pf.title.setValue(responce.title)
			this.pf.consignment.setValue(responce.consignment)
			this.pf.content.setValue(responce.content)
			this.pf.machine.setValue(responce.machine)
			this.pf.operation.setValue(responce.operation)
			this.pf.workflow.setValue(responce.workflow)
			this.projectFileList = responce.project_file
			for(let i = 0; i <responce.project_people.length;i++){
				this.peopleList.push({'user':responce.project_people[i].user_detail,"role":responce.project_people[i].role})
				this.project_people.push({'user':responce.project_people[i].user_detail.id,'role':responce.project_people[i].role})
			}
			
			// for(let i = 0;i <responce.cleint_detail.length;i++){
			// 	this.clientData.push(responce.cleint_detail[i])
			// 	this.clientList.push(responce.cleint_detail[i].id)
			// }
			this.bomfileName = responce.bom.split('/bom/')[1]
			this.spinner.hide();
		})
	}

	openSnackBar(message:string) {
		this._snackBar.open(message, 'Undo', {
			duration: 3000
		});
	}

	removed(name:string){
		var deleteFile = this.projectFileList.filter((file:any)=> file.name == name)[0]
		console.log(deleteFile,'ffffffffff')
		if(deleteFile.id){

			this.auth.patchAPI('file/'+deleteFile.id+'/',{'status': 'Delete'}).subscribe(res=>{
				console.log(res,'ressssssssssss')
			})
		}
		this.projectFileList = this.projectFileList.filter((file:any)=> file.name !== name)
		

		console.log(this.projectFileList)
	}

}
