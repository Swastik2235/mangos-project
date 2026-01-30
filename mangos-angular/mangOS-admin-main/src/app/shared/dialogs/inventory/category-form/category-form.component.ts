import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators ,FormGroup,} from '@angular/forms';

import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-category-form',
	templateUrl: './category-form.component.html',
	styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

	categoryForm = this.fb.group({
		name :[null,Validators.required],
		description :[null, Validators.required],
		status:[null, Validators.required],
	});

	constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CategoryFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) { }

	status = ['Active',"Inactive"]
	get f() { return this.categoryForm.controls; }
	ngOnInit(): void {
		if(this.data.cat_data){
			let data = this.data.cat_data
			this.f.name.setValue(data.name)
			this.f.description.setValue(data.description)
			this.f.status.setValue(data.status)
		}
	}

	closeDialog(){
		this.dialogRef.close()
	}
	addCategory(){
		if(this.data.cat_data){
			this.auth.putAPI('category/'+this.data.cat_data.id+"/",this.categoryForm.value).subscribe(responce=>{
				this.dialogRef.close(responce)
			})
		}else if (this.data.addCat){
			this.auth.postAPI('category/',this.categoryForm.value).subscribe(responce=>{
				this.dialogRef.close(responce)
				//console.log(responce,'rrrrrrrrrrrrrrrrrrrr')
			})
		}
	}

}
