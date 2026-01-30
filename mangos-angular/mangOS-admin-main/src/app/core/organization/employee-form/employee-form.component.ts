import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormControl} from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
	selector: 'app-employee-form',
	templateUrl: './employee-form.component.html',
	styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

	employeeForm = this.fb.group({
		company: [null,Validators.required],
		user :	[null,Validators.required],
		role : [null,Validators.required],
		department : [null,Validators.required],
		shift : [null,Validators.required],
		shift_start : [null,Validators.required],
		shift_end : [null,Validators.required],
		salary : [null,Validators.required],
		joining : [null,Validators.required],
		
	});

	userPermissions:any = localStorage.getItem('userPermissions')

	errors:any = []
	message:string=""
	
	userImgUrl = '' //to show image in form using this variable

	company:any =[];
	user:any = [];
	role:any=[];
	employeeId:any=null;

	shift = ['Day','Night']
	department = ['Account','Dispatch','Galva','Planning','Purchase','Quality','Raw']

	get f() { return this.employeeForm.controls; }

	constructor(private fb: FormBuilder , private auth:AuthenticationService,private spinner: NgxSpinnerService,private router : Router, private activeRoute : ActivatedRoute,public dialog: MatDialog) {
		this.spinner.show()
	 }

	ngOnInit(): void {
		this.getRole()
		this.getUser()
		this.getCompany()
		this.employeeId = this.activeRoute.snapshot.paramMap.get('id')
		if(this.employeeId!= null){
			
			this.loadEmployeeData()
		}else{

			this.spinner.hide()
		}
	}

	getUser(){
		this.auth.getAPI('user/').subscribe(result=>{
			for(let i=0;i<result['results'].length;i++){
				this.user.push(result['results'][i])
			}
		})
	}

	getRole(){
		this.auth.getAPI('group/').subscribe(result=>{
			for(let i=0;i<result['results'].length;i++){
				this.role.push(result['results'][i])
			}
		})
	}
	getCompany(){
		this.auth.getAPI('company/').subscribe(result=>{
			for(let i=0;i<result['results'].length;i++){
				this.company.push(result['results'][i])
			}
		})
	}
	
	updateEmployee(){
		//format date ----->
		this.f.joining.setValue(formatDate(this.f.joining.value,'YYYY-MM-dd','en'));
		// to add new employee----->
		if(this.employeeId == null){
			if(this.employeeForm.valid){
				this.auth.postAPI('employee/',this.employeeForm.value).subscribe(data=>{
					this.auth.patchAPI('user/'+data.user_detail.id+'/',{groups:[this.employeeForm.value.role]}).subscribe(res=>{
						console.log(res)
					})
					this.router.navigate(['/organization/employee']);
				},error =>{
					let keys = Object.keys(error.error)
					for(let i=0;i<keys.length;i++){
						this.errors.push(error.error[keys[i]])
						console.log(error.error[keys[i]])
					}
				});
			}
		}//To Edit Employee --------->
		else{
			if(this.employeeForm.valid){
				this.auth.patchAPI('employee/'+this.employeeId+"/",this.employeeForm.value).subscribe(data=>{
					this.auth.patchAPI('user/'+data.user_detail.id+'/',{groups:[this.employeeForm.value.role]}).subscribe(res=>{
						console.log(res)
					})
					this.router.navigate(['/organization/employee']);
				},error =>{
					let keys = Object.keys(error.error)
					for(let i=0;i<keys.length;i++){
						this.errors.push(error.error[keys[i]])
						console.log(error.error[keys[i]])
					}
				});
			}
		}
	}

	loadEmployeeData(){
		this.auth.getAPI('employee/'+this.employeeId+"/").subscribe(userDetail=>{
			this.f.company.setValue(userDetail.company)
			this.f.user.setValue(userDetail.user)
			this.f.role.setValue(userDetail.role)
			this.f.department.setValue(userDetail.department)
			this.f.shift.setValue(userDetail.shift)
			this.f.shift_start.setValue(userDetail.shift_start)
			this.f.shift_end.setValue(userDetail.shift_end)
			this.f.salary.setValue(userDetail.salary)
			this.f.joining.setValue(userDetail.joining)
			this.spinner.hide()
		});
	}


}
