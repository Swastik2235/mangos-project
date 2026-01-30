import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormControl,} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
//import { AuthenticationService } from '../../services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	profileForm = this.fb.group({
		image : [null],
		username :[null,Validators.required],
		first_name :[null, Validators.required],
		last_name :[null, Validators.required],
		email : [null,[Validators.required,Validators.email]],
		mobile : [null,Validators.required],
		country : [null,Validators.required],
		state : [null,Validators.required],
		signature:[null],
	});

	// for permissions------->
	userPermissions:any = localStorage.getItem('userPermissions')

	errors:any = []
	message:string=""

	user_id = JSON.parse(localStorage.getItem('userdata') || '[]').id;
	userImgUrl = '' //to show image in form using this variable
	userSgnUrl = ''
	country:any =[]
	state:any = []
	
	get f() { return this.profileForm.controls; }

	constructor(private fb: FormBuilder,private router: Router, private auth:AuthenticationService,private spinner: NgxSpinnerService) {
		this.spinner.show();
	}

	ngOnInit(): void {
		this.getCountry()
		this.getState()
		this.loadProfileData()
	}

  	updateProfile(){
		if(this.profileForm.valid){
			if(this.f.image.value === null){
				this.profileForm.removeControl('image'); //remove image control if there is no image
			}
			if(this.f.signature.value === null){
				this.profileForm.removeControl('signature'); //remove image control if there is no image
			}
			this.auth.patchForm('user/'+this.user_id+"/",this.profileForm.value).subscribe(data=>{
				var userDetail = JSON.parse(JSON.stringify(data))  //converting data type Arraybuffer into object
				
				this.f.username.setValue(userDetail.username)
				this.profileForm.controls["first_name"].setValue(userDetail.first_name)
				this.profileForm.controls["last_name"].setValue(userDetail.last_name)
				this.profileForm.controls["email"].setValue(userDetail.email)
				this.profileForm.controls["mobile"].setValue(userDetail.mobile)
				this.profileForm.controls["country"].setValue(userDetail.country)
				this.userImgUrl = userDetail.image
				this.userSgnUrl = userDetail.signature
				// message ----------->
				this.message = "Profile Updated"
				this.profileForm.addControl('image',new FormControl(''));
				this.profileForm.addControl('signature',new FormControl('')); // add image form control
				//this.router.navigate(['dashboard']);
				
			},error =>{
				this.errors.push(error.error['mobile'])
				for(let i=0;i<error.error.length;i++){
					//console.log(error.error[i],'eeeeerrrrrrrrrrrr')
				}
				this.message = ""
			});
		}
	}

	getState(){
		this.auth.getAPI('state/').subscribe(result=>{
			for(let i=0;i<result['results'].length;i++){
				this.state.push(result['results'][i])
			}
		})
  	}

	getCountry(){
		this.auth.getAPI('country/').subscribe(result=>{
			for(let i=0;i<result['results'].length;i++){
				this.country.push(result['results'][i])
			}
		})
	}

	loadProfileData(){
		this.auth.getAPI('user/'+this.user_id+"/").subscribe(userDetail=>{
			this.userImgUrl = userDetail.image
			this.userSgnUrl = userDetail.signature
			this.f.username.setValue(userDetail.username)
			//this.f.image.setValue(userDetail.image)
			this.f.first_name.setValue(userDetail.first_name)
			this.f.last_name.setValue(userDetail.last_name)
			this.f.email.setValue(userDetail.email)
			this.f.mobile.setValue(userDetail.mobile)
			this.f.country.setValue(userDetail.country)
			this.f.state.setValue(userDetail.state)
			this.spinner.hide()
		});
	}
	
	// for image upload ------------>
	fileChangeEvent(event:any){
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.f.image.setValue(file);
		}
	}	
	fileChangeEven(event:any){
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.f.signature.setValue(file);
		}
	}	
}

