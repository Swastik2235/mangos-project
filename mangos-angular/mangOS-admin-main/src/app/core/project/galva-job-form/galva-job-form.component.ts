import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray} from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-galva-job-form',
  templateUrl: './galva-job-form.component.html',
  styleUrls: ['./galva-job-form.component.scss']
})

export class GalvaJobFormComponent implements OnInit {
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
    jig_in : [null],
    jig_out : [null],
    degreasing_in : [null],
    degreasing_out : [null],
    pickling_in : [null],
    pickling_out : [null],
    rinsing_in : [null],
    rinsing_out : [null],
    flux_in : [null],
    flux_out : [null],
    preheater_in : [null],
    preheater_out : [null],
    zincbath_in : [null],
    zincbath_out : [null],
    quenching_in : [null],
    quenching_out : [null],
    dichromate_in : [null],
    dichromate_out : [null],
    filing_in : [null],
    filing_out : [null]
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
  jobID: any;
  constructor(private fb: FormBuilder , private auth:AuthenticationService,private spinner: NgxSpinnerService,private location : Location,private router : Router, private _route : ActivatedRoute,public dialog: MatDialog,private _snackBar: MatSnackBar) { 
    this.spinner.show()
		this.jobID = this._route.snapshot.paramMap.get('id')
		// console.log(this.jobID ,'iiiiiiii')
		this.projectName = this._route.snapshot.paramMap.get('slug')
		
  }
  ngOnInit(): void {
    this.loadData()
  }
	get f() { return this.jobForm.controls; }
  addJob(){
    if(this.jobID!=null){
			this.auth.patchAPI('galva-job-card/'+this.jobID+'/',this.jobForm.value).subscribe(res=>{
				this.openSnackBar("Job Card Updated")
				this.location.back();
			})
  }else{
    this.openSnackBar("Job Card Update Failed")
  }
}
  loadData(){
    this.auth.getAPI('user/').subscribe(result=>{
			this.userList = result.results
		})
		this.auth.getAPI('project/').subscribe(responce=>{
			this.projectList=responce.results
			console.log(responce,'rrrrrrrrr')
		})
    this.auth.getAPI('tank/').subscribe(result=>{
      this.tankList=result.results
      console.log(this.tankList)
    })


		this.auth.getAPI('galva-job-card/'+this.jobID).subscribe(responce=>{
      this.f.project.setValue(responce.project)
			this.f.prepared.setValue(responce.prepared)
			this.f.authorized.setValue(responce.authorized)
      this.f.lot.setValue(responce.lot)
      this.f.tanks.setValue(responce.tanks)
			this.f.release.setValue(responce.release)
			this.f.loading_stand.setValue(responce.loading_stand)
			this.f.trolley.setValue(responce.trolley)
			this.f.zincbath_temp.setValue(responce.zincbath_temp)
      this.f.jig_in.setValue(responce.jig_in)
			this.f.jig_out.setValue(responce.jig_out)
			this.f.degreasing_in.setValue(responce.degreasing_in)
      this.f.degreasing_out.setValue(responce.degreasing_out)
			this.f.pickling_in.setValue(responce.pickling_in)
      this.f.pickling_out.setValue(responce.pickling_out)
			this.f.rinsing_in.setValue(responce.rinsing_in)
			this.f.rinsing_out.setValue(responce.rinsing_out)
      this.f.flux_in.setValue(responce.flux_in)
			this.f.flux_out.setValue(responce.flux_out)
      this.f.preheater_in.setValue(responce.preheater_in)
			this.f.preheater_out.setValue(responce.preheater_out)
			this.f.zincbath_in.setValue(responce.zincbath_in)
      this.f.zincbath_out.setValue(responce.zincbath_out)
			this.f.quenching_in.setValue(responce.quenching_in)
      this.f.quenching_out.setValue(responce.quenching_out)
			this.f.dichromate_in.setValue(responce.dichromate_in)
			this.f.dichromate_out.setValue(responce.dichromate_out)
      this.f.filing_in.setValue(responce.filing_in)
			this.f.filing_out.setValue(responce.filing_out)
    })
  }
  openSnackBar(message:string) {
		this._snackBar.open(message, '', {
			duration: 3000
		});
	}
}