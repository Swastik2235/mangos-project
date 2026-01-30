import { Component, OnInit,Inject, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { formatDate } from '@angular/common';
// import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource , MatTable} from '@angular/material/table';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ConfirmComponent } from '../../default/confirm/confirm.component';

export interface PackageItem {
	id:number;
	title: string;
	order: string;
	note: string;
	spec : string;
	tower : string
}


@Component({
	selector: 'app-packaging-form',
	templateUrl: './packaging-form.component.html',
	styleUrls: ['./packaging-form.component.scss'],
	encapsulation:ViewEncapsulation.None
})
export class PackagingFormComponent implements OnInit {

	// @ViewChild(MatPaginator) paginator!: MatPaginator;
	// @ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<PackageItem>;

	userList:any=[];
	itemList:any=[];
	itemIdList:any=[]
	projectList:any=[]
	transportList:any=[]
	driverList:any=[]
	vehicleList:any=[]
	nextPage:any='';

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

	

	tableData:PackageItem[]=[];
	dataSource = new MatTableDataSource<PackageItem>(this.tableData);

	constructor(public dialog: MatDialog,private location : Location, private fb: FormBuilder,public dialogRef: MatDialogRef<PackagingFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService,private router : Router) {
		this.itemList = data.itemList
		this.projectList = data.projectList.filter((x:any)=>x.id==data.itemList[0].bom_detail.project)
		this.packagingForm.controls['project'].setValue(this.projectList[0].id)
		this.dataSource.data = this.itemList;
	}


	ngAfterViewInit(): void {
		// this.dataSource.sort = this.sort;
		// this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	ngOnInit(): void {
		
		if(this.itemList.length>0){
			for(let i =0;i<this.itemList.length;i++){
				this.itemIdList.push(this.itemList[i].id)
			}
		}
		this.loadUser()
		this.loadDriver()
		this.loadTrans()
		this.loadVehicle()
	}

	// displayedColumns: string[] = ['mark', 'number', 'section', 'length', 'width', 'unit_weight', 'piece_weight', 'quantity','operation', 'tower_quantity', 'weight','n','b','hab','d','remark', 'action'];
	displayedColumns: string[] = ['length', 'width', 'unit_weight', 'piece_weight', 'quantity','operation', 'tower_quantity', 'weight','n','b','hab','d','remark', 'action'];
	
	dispatchData(){
		this.packagingForm.controls['date'].setValue(formatDate(this.packagingForm.controls['date'].value,'YYYY-MM-dd','en'));
		var disData ={
			lr : this.packagingForm.get('lr')?.value,
			date : this.packagingForm.get('date')?.value,
			project : this.packagingForm.get('project')?.value,
			vehicle : this.packagingForm.get('vehicle')?.value,
			driver : this.packagingForm.get('driver')?.value,
			transporter : this.packagingForm.get('transporter')?.value,
			prepared : this.packagingForm.get('prepared')?.value,
			checked : this.packagingForm.get('checked')?.value,
			item : this.itemIdList
		}
		if(this.packagingForm.valid){
			this.auth.postAPI('dispatch/',disData).subscribe(res=>{
				var updateData ={
					'type':'Dispatch',
					'items':this.itemIdList
				}
				this.auth.postAPI('bulk-update-jobitem/',updateData).subscribe(res=>{
					console.log(res)
					this.dialogRef.close('updated')
				})
			})
		}
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

	delete(index:any){
		const dialogRef = this.dialog.open(ConfirmComponent, {
			width:'25%',
			
		})
		dialogRef.afterClosed().subscribe(result => {
			console.log(result,'rrrrrrrrr')
			if(result){
				console.log(index,this.itemIdList)
				
				// this.itemList = this.itemList.splice(index,1)
				this.itemList.splice(index,1)
				this.itemIdList.splice(index,1)
				console.log(this.itemList,this.itemIdList,'iddddddd')
				this.dataSource.data = this.itemList

				this.dataSource._updateChangeSubscription()
			}
		});

	}



	// setData(data: PackageItem[]) {
	// 	this._dataStream.next(data);
	//   }
	

}
