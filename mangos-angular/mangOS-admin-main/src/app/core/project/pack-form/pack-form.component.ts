import { Component, OnInit,Inject, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatTableDataSource , MatTable} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';


export interface PackItem {
	id:number;
	title: string;
	order: string;
	note: string;
	spec : string;
	tower : string
}


@Component({
	selector: 'app-pack-form',
	templateUrl: './pack-form.component.html',
	styleUrls: ['./pack-form.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PackFormComponent implements OnInit {
	@ViewChild(MatTable) table!: MatTable<PackItem>;


	userList:any=[];
	itemList:any=[];
	itemIdList:any=[]
	projectList:any=[]
	transportList:any=[]
	driverList:any=[]
	vehicleList:any=[]
	nextPage:any='';
	packageID:any;

	dispatchData:any;

	packagingForm = this.fb.group({
		lr :[null,Validators.required],
		date :[null, Validators.required],
		project:[null, Validators.required],
		vehicle:[null, Validators.required],
		driver:[null, Validators.required],
		transporter:[null, Validators.required],
		prepared:[null, Validators.required],
		checked:[null, Validators.required],
		// item:this.itemIdList
	});

	tableData:PackItem[]=[];

	// dataSource = new MatTableDataSource<PackItem>(this.tableData);
	// displayedColumns: string[] = ['width', 'name', 'weight', 'symbol'];
  	dataSource:any;

	displayedColumns: string[] = ['length', 'width', 'unit_weight', 'piece_weight', 'quantity','operation', 'tower_quantity', 'weight','n','b','hab','d','remark'];

	constructor(public dialog: MatDialog,private location : Location, private fb: FormBuilder,private auth:AuthenticationService,private router : Router,private _route : ActivatedRoute,private spinner: NgxSpinnerService,private _snackBar:MatSnackBar) {
		this.spinner.show()
		this.packageID = this._route.snapshot.paramMap.get('id')

		this.auth.getAPI('dispatch/'+this.packageID+'/').subscribe(res=>{
			console.log(res,'rrrrr')
			this.dataSource = res.item_data
			this.dispatchData = res
			this.loadUser()
			this.loadDriver()
			this.loadTrans()
			this.loadVehicle()
			this.loadData()
			this.loadProject()
			// this.dispatch = res.results
		})
		// console.log(this.packageID,'iddddd')
	 }

	


	ngOnInit(): void {
		// this.loadData()
	}

	get f() { return this.packagingForm.controls; }
	loadData(){
		this.f.lr.setValue(this.dispatchData.lr)
		this.f.date.setValue(this.dispatchData.date)
		this.f.project.setValue(this.dispatchData.project)
		this.f.vehicle.setValue(this.dispatchData.vehicle)
		this.f.driver.setValue(this.dispatchData.driver)
		this.f.prepared.setValue(this.dispatchData.prepared)
		this.f.checked.setValue(this.dispatchData.checked)
		this.f.transporter.setValue(this.dispatchData.transporter)
		
	}

	

	dispatchDataUpdate(){
		this.packagingForm.controls['date'].setValue(formatDate(this.packagingForm.controls['date'].value,'YYYY-MM-dd','en'));
		if(this.packagingForm.valid){
			this.auth.patchAPI('dispatch/'+this.packageID+'/',this.packagingForm.value).subscribe(res=>{
				this._snackBar.open('Packaging Details Updated','', {duration: 5000, panelClass: ['greenTSnackbar']});
				this.router.navigate(['/project/packaging'])
			})
		}
	}

	loadProject(){
		this.auth.getAPI('project/?'+this.nextPage ).subscribe(res=>{
			this.projectList = this.projectList.concat(res.results)
			if(res.next != null){
				this.nextPage = res.next.split('?')[1]
				this.loadDriver()
			}
			this.spinner.hide()
		})

	}

	loadDriver(){
		this.auth.getAPI('driver/?'+this.nextPage ).subscribe(res=>{
			this.driverList = this.driverList.concat(res.results)
			if(res.next != null){
				this.nextPage = res.next.split('?')[1]
				this.loadDriver()
			}
		})
	}

	loadUser(){
		this.auth.getAPI('user/?'+this.nextPage ).subscribe(res=>{
			this.userList = this.userList.concat(res.results)
			if(res.next != null){
				this.nextPage = res.next.split('?')[1]
				this.loadUser()
			}
		})
	}

	

	loadTrans(){
		this.auth.getAPI('transporter/?'+this.nextPage ).subscribe(res=>{
			this.transportList = this.transportList.concat(res.results)
			if(res.next != null){
				this.nextPage = res.next.split('?')[1]
				this.loadTrans()
			}
		})
	}

	loadVehicle(){
		this.auth.getAPI('vehicle/?'+this.nextPage ).subscribe(res=>{
			this.vehicleList = this.vehicleList.concat(res.results)
			if(res.next != null){
				this.nextPage = res.next.split('?')[1]
				this.loadTrans()
			}
		})
	}

	

}
