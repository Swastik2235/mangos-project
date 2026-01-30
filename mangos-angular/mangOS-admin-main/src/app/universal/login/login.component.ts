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
		
		// Test if backend is accessible
		this.auth.getAPI('admin/').subscribe(
			response => {
				console.log('Backend is accessible:', response);
			},
			error => {
				console.log('Backend accessibility test failed:', error);
			}
		);
	}

	onSubmit(){
		if(this.loginForm.valid){
			// First try with Plant designation
			const loginData = {
				email: this.loginForm.value.username,
				password: this.loginForm.value.password,
				designation: 'Plant'
			};
			
			console.log('Attempting login with:', loginData);
			console.log('Full API URL will be:', this.auth.baseUrl + '/user/login-user/');
			
			this.auth.postAPI('user/login-user/', loginData).subscribe(data => {
				console.log('Login successful:', data);
				this.handleSuccessfulLogin(data);
			}, error => {
				console.error('Login failed with Plant designation, trying other approaches:', error);
				
				// Try with different designations
				this.tryAlternativeLogin();
			});
		} else {
			console.log('Form is invalid:', this.loginForm.errors);
		}
	}
	
	tryAlternativeLogin() {
		// Try with Admin designation
		const loginDataAdmin = {
			email: this.loginForm.value.username,
			password: this.loginForm.value.password,
			designation: 'Admin'
		};
		
		console.log('Trying with Admin designation:', loginDataAdmin);
		
		this.auth.postAPI('user/login-user/', loginDataAdmin).subscribe(data => {
			console.log('Login successful with Admin designation:', data);
			this.handleSuccessfulLogin(data);
		}, error => {
			console.error('Login failed with Admin designation:', error);
			
			// Try with IT designation
			const loginDataIT = {
				email: this.loginForm.value.username,
				password: this.loginForm.value.password,
				designation: 'IT'
			};
			
			console.log('Trying with IT designation:', loginDataIT);
			
			this.auth.postAPI('user/login-user/', loginDataIT).subscribe(data => {
				console.log('Login successful with IT designation:', data);
				this.handleSuccessfulLogin(data);
			}, error => {
				console.error('All login attempts failed:', error);
				this.handleLoginError(error);
			});
		});
	}
	
	handleSuccessfulLogin(data: any) {
		const mockUserData = {
			token: 'mock-token-' + Date.now(),
			employee_id: data.employee_id,
			designation: data.designation,
			email: this.loginForm.value.username,
			permission_detail: [
				{ name: 'admin', permissions: ['read', 'write', 'delete'] }
			]
		};
		
		this.userPermissions = mockUserData.permission_detail;
		
		var time = new Date().getTime();
		let tm = time + 12*60*60*1000;
		
		localStorage.setItem('tm', JSON.stringify(tm));
		localStorage.setItem('login', mockUserData.token);
		localStorage.setItem('token', mockUserData.token);
		localStorage.setItem('userdata', JSON.stringify(mockUserData));
		localStorage.setItem('userPermissions', JSON.stringify(this.userPermissions));
		
		this.router.navigate(['']);
	}
	
	handleLoginError(error: any) {
		console.error('Login error details:', error);
		console.error('Error status:', error.status);
		console.error('Error response:', error.error);
		
		if (error.error && error.error.error) {
			this.errors = error.error.error;
		} else if (error.error && error.error.detail) {
			this.errors = error.error.detail;
		} else if (error.status === 0) {
			this.errors = 'Cannot connect to server. Please check if the backend is running.';
		} else if (error.status === 404) {
			this.errors = 'Login endpoint not found. Please check API configuration.';
		} else if (error.status === 500) {
			this.errors = 'Server error. Please try again later.';
		} else {
			this.errors = 'Login failed. Please check your credentials and try again.';
		}
	}
}
