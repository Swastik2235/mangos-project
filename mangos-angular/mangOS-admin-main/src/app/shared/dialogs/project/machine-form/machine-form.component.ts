import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-machine-form',
	templateUrl: './machine-form.component.html',
	styleUrls: ['./machine-form.component.scss']
})
export class MachineFormComponent implements OnInit {

	machineForm = this.fb.group({
		service :[null,Validators.required],
		title :[null,Validators.required],
		content :[null, Validators.required],
	});
	service:any=[];
	tower = false

	constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<MachineFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) { }

	ngOnInit(): void {
		this.auth.getAPI('service/').subscribe(data=>{
			this.service = data.results
		})
		if(this.data.tower){
			this.tower = true
			this.machineForm.removeControl('content');
			let data = this.data.myData
			// console.log(this.data,'jjjjjjj')
			if(this.data.myData){
				this.machineForm.controls['title'].setValue(data.title)
			}
			
		}
		else if(this.data.myData){
			let data = this.data.myData
			this.machineForm.controls['service'].setValue(data.service)
			this.machineForm.controls['title'].setValue(data.title)
			this.machineForm.controls['content'].setValue(data.content)
		}
	}

	closeDialog(){
		this.dialogRef.close()
	}

	addData(){
		if(this.data.title == "Add Machine"){
			this.auth.postAPI('machine/',this.machineForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}else if(this.data.title == "Edit Machine"){
			this.auth.patchAPI('machine/'+this.data.myData.slug+'/',this.machineForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}else if(this.data.title == "Add Mark"){
			this.auth.postAPI('mark/',this.machineForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}else if(this.data.title == "Edit Mark"){
			this.auth.patchAPI('mark/'+this.data.myData.id+'/',this.machineForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}else if(this.data.title =="Add Tower"){
			this.auth.postAPI('tower/',this.machineForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}
		else if(this.data.title =="Edit Tower"){
			this.auth.patchAPI('tower/'+this.data.myData.id+'/',this.machineForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}

	}

}
