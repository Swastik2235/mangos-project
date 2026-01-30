import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators ,FormGroup,} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ForgotComponent implements OnInit {

	forgotPasswordForm = this.fb.group({
		email :[null, [Validators.required,Validators.email]],
	})

	verifyForm = this.fb.group({
		uid : [Validators.required],
		token : [Validators.required],
		password :[null, [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
		cpassword:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(20)]]
	})

	message:string = '';
	emailSent = true;
	passwordChanged = false;
	

	uid:any;
	token:any;
	userVerify = false;
	passwordMatch = true;

	get f() { return this.forgotPasswordForm.controls; }
	get v() { return this.verifyForm.controls;}

	constructor(private fb: FormBuilder,private router: Router,private _route:ActivatedRoute,private auth:AuthenticationService) {
		localStorage.removeItem('token')
		this.uid = this._route.snapshot.paramMap.get('uid')
		this.token = this._route.snapshot.paramMap.get('token')
		
		if(this.uid){
			this.userVerify = true;
			this.v.uid.setValue(this.uid)
			this.v.token.setValue(this.token)
			//console.log(this.uid,this.token)
			}
		}

	ngOnInit(): void {
		}

	onSubmit(){
		if(this.uid){
			// for verify token form------------>
			this.auth.postAPI('verify-token/',this.verifyForm.value).subscribe(responce=>{
				this.message = responce.detail
				this.passwordChanged = true;
				// this.verifyForm.reset()

			},error=>{
				this.message = error.error['token']
			});

		}else{
			// for forgot passowrd -------------->
			this.auth.postAPI('forgot-password/',this.forgotPasswordForm.value).subscribe(response=>{
				//console.log(response)
				this.emailSent = false
				this.message = response.detail
			},error=>{
				//console.log(error.error.detail,'888888888888888888')
				this.message = error.error.detail
			})
		}
	}
	passwordMatchFunction(){
		if(this.verifyForm.get('password')?.value != this.verifyForm.get('cpassword')?.value){
			this.passwordMatch = false
			
		}else{
			this.passwordMatch = true
		}
	}


}
