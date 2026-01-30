import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormBuilder,Validators,FormControl,FormArray} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-permission-form',
	templateUrl: './permission-form.component.html',
	styleUrls: ['./permission-form.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PermissionFormComponent implements OnInit {
	permissionForm = this.fb.group({
		name : [null,Validators.required],
	});
	
	errors:any=[];
	permissionData:any= []
	selectedPermissions:any=[];
	groupId:any = null;
	
	constructor(private fb: FormBuilder,private auth:AuthenticationService,private spinner: NgxSpinnerService,private router : Router, private activeRoute : ActivatedRoute) {
		this.spinner.show()
	}

	ngOnInit(): void {
		this.auth.getAPI('permission/').subscribe(data=>{
			for(let i = 0;i<data.length;i++){
				this.permissionData.push({id:data[i].id,name:data[i].name,value:false})
			}
			this.spinner.hide()
		});
		this.groupId = this.activeRoute.snapshot.paramMap.get('id')
		if(this.groupId!= null){
			this.loadGroupData()
		}
	}

	addPermission(){
		this.errors = []
		if(this.groupId!= null){
			let data = {'name': this.permissionForm.controls['name'].value,'permissions': this.selectedPermissions}
			
			this.auth.patchAPI('group/'+this.groupId+'/',data).subscribe(data=>{
				this.router.navigate(['/organization/permission']);

			},error =>{
				this.displayError(error)
			});
		}else{
			let data = {'name': this.permissionForm.controls['name'].value,'permissions': this.selectedPermissions}
			console.log(data,'ddddddddddd')
			this.auth.postAPI('group/',data).subscribe(data=>{
				this.router.navigate(['/organization/permission']);
			},error =>{
				this.displayError(error)
			});
		}
	}

	onCheckboxChange(event:any, index:number){
		//console.log(event,'eeeeee')
		if(event.checked == true){
			this.selectedPermissions.push(event.source.value.id)
		}else{
			const indexx = this.selectedPermissions.indexOf(event.source.value.id)
			this.selectedPermissions.splice(indexx,1)
		}
	}

	loadGroupData(){
		this.auth.getAPI('group/'+this.groupId).subscribe(data=>{
			this.permissionForm.controls['name'].setValue(data.name)
			for(let i = 0;i<data.permissions.length;i++){
				if(data.permissions.indexOf(this.permissionData[i].id !== -1)){
					this.permissionData[i].value = true;
					//console.log(this.permissionData[i].value )
					this.selectedPermissions.push(this.permissionData[i].id)
				}
			}
			this.spinner.hide()
		})
	};


	displayError(error:any){
		let keys = Object.keys(error.error)
		for(let i=0;i<keys.length;i++){
			this.errors.push(error.error[keys[i]])
			console.log(error.error[keys[i]])
		}
	};

}
