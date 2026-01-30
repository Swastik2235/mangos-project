import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-section-form',
	templateUrl: './section-form.component.html',
	styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

	sectionForm = this.fb.group({
		title :[null,Validators.required],
		height :[null, Validators.required],
		width:[null, Validators.required],
		length:[null, Validators.required],
		thickness:[null, Validators.required],
	});

	constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<SectionFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) { }

	ngOnInit(): void {
		if(this.data.title=='Edit Section'){
			var myData = this.data.myData
			this.sectionForm.controls['title'].setValue(myData.title)
			this.sectionForm.controls['height'].setValue(myData.height)
			this.sectionForm.controls['width'].setValue(myData.width)
			this.sectionForm.controls['length'].setValue(myData.length)
			this.sectionForm.controls['thickness'].setValue(myData.thickness)
		}
	}

	closeDialog(){
		this.dialogRef.close()
	}
	addSection(){
		if(this.data.title=='Add Section'){
			this.auth.postAPI('section/',this.sectionForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}else{
			this.auth.patchAPI('section/'+this.data.myData.id+'/',this.sectionForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}
		
	}

}
