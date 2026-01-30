import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

	serviceForm = this.fb.group({
		title :[null,Validators.required],
		content :[null, Validators.required],
	});
  tower=false
	constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ServiceFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) { }

  ngOnInit():  void {
		if(this.data.tower){
			this.tower = true
			this.serviceForm.removeControl('content');
			let data = this.data.myData
			// console.log(this.data,'jjjjjjj')
			if(this.data.myData){
				this.serviceForm.controls['title'].setValue(data.title)
			}
			
		}
		else if(this.data.myData){
			let data = this.data.myData
			this.serviceForm.controls['title'].setValue(data.title)
			this.serviceForm.controls['content'].setValue(data.content)
		}
	}
  closeDialog(){
		this.dialogRef.close()
	}

	addData(){
		if(this.data.title == "Add Service"){
			this.auth.postAPI('service/',this.serviceForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}
    else if(this.data.title == "Edit Service"){
			this.auth.patchAPI('service/'+this.data.myData.slug+'/',this.serviceForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
    }}
}
