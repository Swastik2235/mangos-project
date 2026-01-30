import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-galva-material-form',
  templateUrl: './galva-material-form.component.html',
  styleUrls: ['./galva-material-form.component.scss']
})
export class GalvaMaterialFormComponent implements OnInit {
  galvaMaterialForm=this.fb.group({
		project :[null, Validators.required],
		section :[null, Validators.required],
		name :[null, Validators.required],
		material_type :[null, Validators.required],
		length :[null, Validators.required],
		width :[null, Validators.required],
		thickness :[null, Validators.required],
		weight :[null, Validators.required],
		min_coating_required :[null, Validators.required],
  })
  projectList:any=[];
	sectionList:any=[];
	selectedP:any;
  markList:any=[];
  towerList:any=[];

  constructor(private location : Location, private fb: FormBuilder,public dialogRef: MatDialogRef<GalvaMaterialFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService,private router : Router) {
		this.projectList = data['projects'];
		this.sectionList = data['sections'];
    this.selectedP = data['selectedP'];
  console.log(data,'llllllllllllllllll')
    if(this.selectedP != null && this.projectList){
      let sProject = this.projectList.filter((project:any) => project.slug == this.selectedP)
      this.f.project.setValue(sProject[0].id)
    }
  }

  ngOnInit(): void {
  }
	get f() { return this.galvaMaterialForm.controls; }
  addGalva(){
    if (this.galvaMaterialForm.invalid) {
    console.log(this.galvaMaterialForm.value,'form invaliddddd')
        return;
    }
  else{
    console.log(this.galvaMaterialForm.value,'form validdddd')

    this.auth.postAPI('galva-material/',this.galvaMaterialForm.value).subscribe(res=>{
      console.log(res,'materialformmmmmmmmapi')
      this.dialogRef.close(res)
    },error=>{
      console.log(error,'lllll')
    })
  }
}

}
