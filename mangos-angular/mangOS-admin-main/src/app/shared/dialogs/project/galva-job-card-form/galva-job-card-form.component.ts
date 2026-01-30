import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-galva-job-card-form',
  templateUrl: './galva-job-card-form.component.html',
  styleUrls: ['./galva-job-card-form.component.scss']
})
export class GalvaJobCardFormComponent implements OnInit {
  jobForm = this.fb.group({
		project :[null, Validators.required],
		prepared : [null,Validators.required],
		authorized : [null,Validators.required],
		tanks : [null,Validators.required],
		release : [null,Validators.required],
		lot : [null,Validators.required],
    loading_stand : [null],
    trolley : [null],
    zincbath_temp : [null],
    galvajobitems : this.fb.array([this.fb.group({
      galva_material:[null,Validators.required],
      // galva_jobcard:[null,Validators.required],
      length:[null,Validators.required],
      width:[null,Validators.required],
      thickness:[null,Validators.required],
      weight:[null,Validators.required],
      material_type:[null,Validators.required],
      min_coating_required:[null,Validators.required],
      remark:[null],
    })])
  })
  userList:any=[];
	projectList:any=[];
	sectionList:any=[];
	projectName:any;
	towerList:any=[]
	nextPage:any = '';
	selectedP:any;
	jobItemList:any=[];
	itemList:any=[];
	sectionListt:any=[];
	eventM:any=[];
	loginUser:any;
  tankList:any=[];

  constructor(private location : Location, private fb: FormBuilder,public dialogRef: MatDialogRef<GalvaJobCardFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService,private router : Router) {
  console.log(data)
  this.projectList = data['project'];
  this.selectedP = data['selectedP'];
  this.itemList = data['itemList'];
  if(this.selectedP != null && this.projectList){
    let sProject = this.projectList.filter((project:any) => project.slug == this.selectedP)
    this.f.project.setValue(sProject[0].id)
  }
  this.loginUser = JSON.parse(localStorage.getItem('userdata') || '')
  if(this.loginUser){
    this.f.prepared.setValue(this.loginUser.id)
  }
  this.auth.getAPI('tank/').subscribe(result=>{
    this.tankList=result.results
    console.log(this.tankList)
  })
  this.auth.getAPI('user/').subscribe(result=>{
    this.userList = result.results
  })
  this.addItemList(this.itemList);

  }
  get galvajobitems(){
		return this.jobForm.get('galvajobitems') as FormArray;
	}
	get f() { return this.jobForm.controls; }
  addItemList(itemList:any){
		this.galvajobitems.removeAt(0)
		for(let i = 0;i<itemList.length;i++){
			this.galvajobitems.push(this.fb.group({
        galva_material:itemList[i].id,
        length:itemList[i].length,
        width:itemList[i].width,
        thickness:itemList[i].thickness,
        weight:itemList[i].weight,
        material_type:itemList[i].material_type,
        min_coating_required:itemList[i].min_coating_required,
        remark:[null],
    }))
    } 
  }
  addJob(){
    if (this.jobForm.invalid) {
			console.log(this.jobForm,'form invaliddddd')
	      	return;
	    }else{
			console.log(this.jobForm.value,'form validdddd')
			this.f.release.setValue(formatDate(this.f.release.value,'YYYY-MM-dd','en'));
			console.log(this.jobForm.value,'ssssssssssssss')
			this.auth.postAPI('galva-job-card/',this.jobForm.value).subscribe(res=>{
			console.log(this.jobForm.value,'ssssssssssssss')
			// this.router.navigate(['project/job-card'])
				this.dialogRef.close()	
				// console.log(res)
			})
		}
  }
  ngOnInit(): void {
  }

}
