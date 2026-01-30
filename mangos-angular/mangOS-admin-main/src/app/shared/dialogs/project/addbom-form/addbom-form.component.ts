import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-addbom-form',
  templateUrl: './addbom-form.component.html',
  styleUrls: ['./addbom-form.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AddbomFormComponent implements OnInit {
  bomForm = this.fb.group({
		project :[null, Validators.required],
		section :[null, Validators.required],
		mark :[null, Validators.required],
		tower :[null, Validators.required],
		number :[null, Validators.required],
		length :[null, Validators.required],
		width :[null, Validators.required],
		unit_weight :[null, Validators.required],
		piece_weight :[null, Validators.required],
		quantity :[null, Validators.required],
		tower_quantity :[null, Validators.required],
		weight :[null, Validators.required],
		note :[null, Validators.required],
    remark:[null, Validators.required],
		operation :[null, Validators.required],
  })
  projectList:any=[];
	sectionList:any=[];
  markList:any=[];
  towerList:any=[];

  constructor(private location : Location, private fb: FormBuilder,public dialogRef: MatDialogRef<AddbomFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService,private router : Router) {
		this.projectList = data['projects'];
		this.sectionList = data['sections'];
    console.log(data,'llllllllllllllllll')
  }

  ngOnInit(): void {
    this.auth.getAPI('mark/').subscribe(result=>{
			this.markList = result.results
		})
    this.auth.getAPI('tower/').subscribe(result=>{
			this.towerList = result.results
		})
    console.log(this.towerList,'towerrrrrrrrrr')
    console.log(this.markList,'marrrrrrrrrrrkkkkkkkkkkkk')
  }
	get f() { return this.bomForm.controls; }

  addBom(){
    if (this.bomForm.invalid) {
			console.log(this.bomForm.value,'form invaliddddd')
	      	return;
	    }
    else{
			console.log(this.bomForm.value,'form validdddd')

			this.auth.postAPI('bom/',this.bomForm.value).subscribe(res=>{
        console.log(res,'bomformmmmmmmmapi')
        this.dialogRef.close(res)
			},error=>{
        console.log(error,'lllll')
      })
    }
  }
}
