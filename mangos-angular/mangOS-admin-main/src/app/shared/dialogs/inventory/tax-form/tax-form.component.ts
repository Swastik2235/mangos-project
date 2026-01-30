import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-tax-form',
	templateUrl: './tax-form.component.html',
	styleUrls: ['./tax-form.component.scss']
})
export class TaxFormComponent implements OnInit {

	taxForm = this.fb.group({
		type :[null,Validators.required],
		name :[null, Validators.required],
		value:[null, Validators.required],
		status:[null, Validators.required],
	});

	constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<TaxFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) { }


	status = ['Active',"Inactive"]
	taxType = ['Percentage','Fixed']
	get f() { return this.taxForm.controls; }

	ngOnInit(): void {
		console.log(this.data.tax_data)
		if(this.data.tax_data){
			let data = this.data.tax_data
			this.f.type.setValue(data.type)
			this.f.name.setValue(data.name)
			this.f.value.setValue(data.value)
			this.f.status.setValue(data.status)
		}
	}

	closeDialog(){
		this.dialogRef.close()
	}

	addTax(){

		if(this.data.tax_data){
			this.auth.putAPI('tax/'+this.data.tax_data.id+"/",this.taxForm.value).subscribe(responce=>{
				this.dialogRef.close(responce)
			})
		}else if(this.data.addTax){
			this.auth.postAPI('tax/',this.taxForm.value).subscribe(responce=>{
				this.dialogRef.close(responce)
				//console.log(responce,'rrrrrrrrrrrrrrrrrrrr')
			})
		}
	}

}
