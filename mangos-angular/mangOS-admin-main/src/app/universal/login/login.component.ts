import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormGroup,} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	hide = true;
	errors:string = ''
	userPermissions:any =[]
	loginForm = this.fb.group({
		username :[null, Validators.required],
		password :[null, Validators.required],
	})
	constructor(private fb: FormBuilder,private router: Router,private auth:AuthenticationService) {
		localStorage.removeItem('token')
	}

	ngOnInit(): void {
		//console.log(Date.getTime(),'ffff')
	}

	onSubmit(){
		if(this.loginForm.valid){
			this.auth.postAPI('login/',this.loginForm.value).subscribe(data => {
			// console.log('dddddddddddd',data.permission_detail)
				for(let i=0;i<data.permission_detail.length;i++){
					this.userPermissions.push(data.permission_detail[i])
				}	
				var time = new Date().getTime();
				//console.log(time,'tttttttttttt')
				let tm = time+12*60*60*1000
				localStorage.setItem('tm',JSON.stringify(tm))
				localStorage.setItem('login',data['token'])
				localStorage.setItem('token',data['token'])
				localStorage.setItem('userdata',JSON.stringify(data))
				localStorage.setItem('userPermissions',JSON.stringify(this.userPermissions))
				this.router.navigate(['']);
			},error =>{
				 this.errors = error.error.detail
			})
		}
	}
}
