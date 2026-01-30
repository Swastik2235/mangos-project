import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-tank-form',
  templateUrl: './tank-form.component.html',
  styleUrls: ['./tank-form.component.scss']
})
export class TankFormComponent implements OnInit {

  tankForm = this.fb.group({
    	title :[null,Validators.required],
		content :[null, Validators.required],
		type :[null,Validators.required],
	});
  type:any=['Jig', 'Degreasing', 'Pickling' ,'Rinsing', 'Flux' ,'Preheater' ,'Zincbath' ,'Quenching' ,'Dichromate']
  
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<TankFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) { }
  
  ngOnInit(): void {
    if(this.data.myData){
			let data = this.data.myData
			this.tankForm.controls['type'].setValue(data.type)
			this.tankForm.controls['title'].setValue(data.title)
			this.tankForm.controls['content'].setValue(data.content)
		}
  }

  closeDialog(){
		this.dialogRef.close()
	}
  addData(){
		if(this.data.title == "Add Tank"){
			this.auth.postAPI('tank/',this.tankForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}else if(this.data.title == "Edit Tank"){
			this.auth.patchAPI('tank/'+this.data.myData.slug+'/',this.tankForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})}
    }
}
