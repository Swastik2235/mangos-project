import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-people-form',
	templateUrl: './people-form.component.html',
	styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {

	peopleForm = this.fb.group({
		project:null,
		role :[null,Validators.required],
		user :[null, Validators.required],
	});

	roles = ['Manager','Plant Head','Client']
	userList:any=[]
	userType=''
	constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<PeopleFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService,private spinner: NgxSpinnerService) { 
		// this.spinner.show()
		this.f.project.setValue(this.data.projectId)
		this.loadData()
		//console.log(this.f.project.value,'vvvvvvv')
	}


	get f() { return this.peopleForm.controls; }
	ngOnInit(): void {
		

	}

	closeDialog(){
		this.dialogRef.close()
	}

	loadData(){
		this.auth.getAPI('user/').subscribe(responce=>{
			this.userList = responce.results
		})
	}

	addPerson(){
		console.log(this.f.user.value,'user')
		// In Create Project--------->
		if(this.data.add){
			this.userType = 'Client'

			let user = this.userList.filter((user:any)=> user.id == this.f.user.value)
			if(this.data.addPeople){
				this.userType = '';
				this.dialogRef.close({'user':user,'role':this.f.role.value})
			}else{
				this.dialogRef.close(user)
			}
			
			//console.log(this.userList.filter((user:any)=> user.id == 5),'user')
			
			
		}
		else{
			// In Project Settings--------->
			this.auth.postForm('people/',this.peopleForm.value).subscribe(responce=>{
				//console.log(responce)
				this.dialogRef.close(responce)
			})
		}
		
	}
	

}
