import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators ,FormGroup,FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';



@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

	changePasswordForm = this.fb.group({
		oldpassword :[null, Validators.required],
		newpassword :[null, [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
		confirmpassword :[null, [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
	})

	hide = true;
	old_password = true;
	new_password = true;
	errors:any = [];
	passwordMatch = true;
	
	
	get f() { return this.changePasswordForm.controls; }
	constructor(private fb: FormBuilder,private router: Router,private auth:AuthenticationService, private location:Location) { }
	
	ngOnInit(): void {
		
	}
	
	onSubmit(){
		let data ={
			old_password : this.changePasswordForm.get('oldpassword')?.value,
			new_password : this.changePasswordForm.get('confirmpassword')?.value,
		}
		this.auth.postAPI('change-password/',data).subscribe(responce=>{
			this.errors = responce.detail

		},error =>{
			this.errors = error.error.old_password[0]
		})
		
	}
	onCancel(){
		this.location.back();
	}

	passwordMatchFunction(){
		if(this.changePasswordForm.get('confirmpassword')?.value != this.changePasswordForm.get('newpassword')?.value){
			this.passwordMatch = false
			//console.log(this.passwordMatch)
		}else{
			this.passwordMatch = true
			//console.log('trueeeeeeeee')
		}
	}
	

}
