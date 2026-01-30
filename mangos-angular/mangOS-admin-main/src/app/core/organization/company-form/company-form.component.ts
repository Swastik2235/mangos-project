import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormControl} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-company-form',
	templateUrl: './company-form.component.html',
	styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
	
	companyForm = this.fb.group({
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
	companyId:any=null;
	addCompany=true;

	constructor(private fb: FormBuilder , private auth:AuthenticationService,private spinner: NgxSpinnerService,private router : Router, private activeRoute : ActivatedRoute) {
		this.spinner.show()
	 }

	ngOnInit(): void {
		this.getCountry()
		this.getState()
		this.companyId = this.activeRoute.snapshot.paramMap.get('id')

		if(this.companyId!= null){
			this.loadCompanyData()
			this.addCompany = false;
		}else{
			this.spinner.hide()
		}
	}


	get f() { return this.companyForm.controls; }
	updateCompany(){
		//remove image control if there is no image
		if(this.f.logo.value === null){
			this.companyForm.removeControl('logo'); 
		}
		// console.log(this.companyForm.value)
		if(this.companyId == null){
			this.auth.postForm('company/',this.companyForm.value).subscribe(responce=>{
				//console.log(responce,'555555555')
				this.router.navigate(['/organization/company']);
			})
		}else{
			if(this.companyForm.valid){
				this.auth.patchForm('company/'+this.companyId+"/",this.companyForm.value).subscribe(data=>{
					this.router.navigate(['/organization/company']);
				},error =>{
					let keys = Object.keys(error.error)
					for(let i=0;i<keys.length;i++){
						this.errors.push(error.error[keys[i]])
						console.log(error.error[keys[i]])
					}
				});
			}
		}
		let img = this.companyForm.get('logo')
		if(img == null){
			this.companyForm.addControl('logo',new FormControl(''));
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
	loadCompanyData(){
		this.auth.getAPI('company/'+this.companyId+"/").subscribe(companyDetail=>{
			this.userImgUrl = companyDetail.logo
			this.f.name.setValue(companyDetail.name)
			this.f.email.setValue(companyDetail.email)
			this.f.founded.setValue(companyDetail.founded)
			this.f.about.setValue(companyDetail.about)
			this.f.phone.setValue(companyDetail.phone)
			this.f.mobile.setValue(companyDetail.mobile)
			this.f.country.setValue(companyDetail.country)
			this.f.state.setValue(companyDetail.state)
			this.f.city.setValue(companyDetail.city)
			this.f.address.setValue(companyDetail.address)
			this.f.pincode.setValue(companyDetail.pincode)
			this.f.website.setValue(companyDetail.website)
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
