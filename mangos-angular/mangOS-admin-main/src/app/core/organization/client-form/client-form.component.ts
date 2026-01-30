import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormControl} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
	
	clientForm = this.fb.group({
		logo :	[null],
		name : [null,Validators.required],
		email : [null,[Validators.required,Validators.email]],
		mobile : [null,[Validators.required,Validators.minLength(10),Validators.maxLength(15)]],
		phone:	[null],
		founded : [null,Validators.required],
		country : [null,Validators.required],
		state : [null,Validators.required],
		city : [null,Validators.required],
		pincode : [null,Validators.required],
		address: [null,Validators.required],
		website: [null,Validators.required],
		about : [null],
	});

	errors:any = [];
	message:string="";
	
	userImgUrl = '' //to show image in form using this variable

	country:any =[];
	state:any = [];
	clientId:any=null;
	addClient=true;

	constructor(private fb: FormBuilder , private auth:AuthenticationService,private spinner: NgxSpinnerService,private router : Router, private activeRoute : ActivatedRoute) {
		this.spinner.show()
	 }

	ngOnInit(): void {
		this.getCountry()
		this.getState()
		this.clientId = this.activeRoute.snapshot.paramMap.get('id')

		if(this.clientId!= null){
			this.loadClientData()
			this.addClient = false;
		}else{
			this.spinner.hide()
		}
	}


	get f() { return this.clientForm.controls; }
	updateClient(){
		//remove image control if there is no image
		if(this.f.logo.value === null){
			this.clientForm.removeControl('logo'); 
		}
		// console.log(this.clientForm.value)
		if(this.clientId == null){
			this.auth.postForm('client/',this.clientForm.value).subscribe(responce=>{
				//console.log(responce,'555555555')
				this.router.navigate(['/organization/client']);
			})
		}else{
			if(this.clientForm.valid){
				this.auth.patchForm('client/'+this.clientId+"/",this.clientForm.value).subscribe(data=>{
					this.router.navigate(['/organization/client']);
				},error =>{
					let keys = Object.keys(error.error)
					for(let i=0;i<keys.length;i++){
						this.errors.push(error.error[keys[i]])
						console.log(error.error[keys[i]])
					}
				});
			}
		}
		let img = this.clientForm.get('logo')
		if(img == null){
			this.clientForm.addControl('logo',new FormControl(''));
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
	loadClientData(){
		this.auth.getAPI('client/'+this.clientId+"/").subscribe(clientDetail=>{
			this.userImgUrl = clientDetail.logo
			this.f.name.setValue(clientDetail.name)
			this.f.email.setValue(clientDetail.email)
			this.f.founded.setValue(clientDetail.founded)
			this.f.about.setValue(clientDetail.about)
			this.f.phone.setValue(clientDetail.phone)
			this.f.mobile.setValue(clientDetail.mobile)
			this.f.country.setValue(clientDetail.country)
			this.f.state.setValue(clientDetail.state)
			this.f.city.setValue(clientDetail.city)
			this.f.address.setValue(clientDetail.address)
			this.f.pincode.setValue(clientDetail.pincode)
			this.f.website.setValue(clientDetail.website)
			this.spinner.hide()
		});
	}

	fileChangeEvent(event:any){
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.f.logo.setValue(file);
		}
	}
}
