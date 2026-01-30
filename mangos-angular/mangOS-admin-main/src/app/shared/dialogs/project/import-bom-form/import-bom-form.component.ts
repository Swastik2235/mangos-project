import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder,Validators,FormControl} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
	selector: 'app-import-bom-form',
	templateUrl: './import-bom-form.component.html',
	styleUrls: ['./import-bom-form.component.scss'],
	encapsulation:ViewEncapsulation.None
})
export class ImportBomFormComponent implements OnInit {

	bomfile:any;
	bomfileName:any;

	importBomForm = this.fb.group({
		project : [null,Validators.required],
	});

	fileError:any;
	constructor(@Inject(MAT_DIALOG_DATA) public data:any, private fb:FormBuilder, private auth:AuthenticationService, private dialogRef:MatDialogRef<ImportBomFormComponent>) {
		console.log(data, '11111111111')
	}

	ngOnInit(): void {

		this.importBomForm = this.fb.group({
			project : [null,Validators.required],
		});
	}


	get bf() { return this.importBomForm.controls; }
	BomFileSubmit(){
		if (this.importBomForm.invalid) {
			return;
		}else{
			if(this.bomfile){
				this.auth.patchForm2('project/'+this.bf.project.value+'/',[{'bom':this.bomfile}]).subscribe(result=>{
					if(result){
						this.dialogRef.close(result)
					}
				})
			}else{
				this.fileError = 'file is required'
			}
		}
	}

	importBomFile(event:any){
		this.bomfile = event.target.files[0]
		for(let i = 0; i < event.target.files.length;i++){
			this.bomfileName = event.target.files[i].name
		}
	}

}
