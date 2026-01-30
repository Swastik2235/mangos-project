import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators ,FormGroup, FormGroupDirective} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  chide = true;
  errors:string = ''
  userPermissions:any =[]
  currentYear:any;
  passwordMatch = true;
  countryList:any = [];
  // linkedinCode:any;
  // loginUrl:any;

  signupForm = this.fb.group({
    first_name :[null, [Validators.required,Validators.minLength(3)]],
    last_name :[null, [Validators.required,Validators.minLength(3)]],
    email :[null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    country :[null, Validators.required],
    mobile :[null, [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8),Validators.maxLength(12)]],
    password :[null, [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])'))]],
    cpassword :[null, [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])'))]],
  })
  get sf() { return this.signupForm.controls; }
  constructor(private zone: NgZone, private spinner:NgxSpinnerService,private dialog:MatDialog,private fb: FormBuilder, private auth: AuthenticationService, private router:Router, private route:ActivatedRoute) {
    console.log("Hello Signup")
    this.currentYear = new Date().getFullYear();
    
    // Hardcoded country list as fallback since backend doesn't have country endpoint
    this.countryList = [
      { id: 1, code: '91', code3: 'IND', name: 'India' },
      { id: 2, code: '1', code3: 'USA', name: 'United States' },
      { id: 3, code: '44', code3: 'GBR', name: 'United Kingdom' },
      { id: 4, code: '61', code3: 'AUS', name: 'Australia' },
      { id: 5, code: '49', code3: 'DEU', name: 'Germany' },
      { id: 6, code: '33', code3: 'FRA', name: 'France' },
      { id: 7, code: '81', code3: 'JPN', name: 'Japan' },
      { id: 8, code: '86', code3: 'CHN', name: 'China' },
      { id: 9, code: '7', code3: 'RUS', name: 'Russia' },
      { id: 10, code: '55', code3: 'BRA', name: 'Brazil' }
    ];
    
    // Try to fetch from API, but use fallback if it fails
    this.auth.getAPI('country/').subscribe(
      result => {
        if (result && result['results'] && result['results'].length > 0) {
          this.countryList = result['results'];
        }
      },
      error => {
        console.log('Country API not available, using fallback list');
        // countryList is already set above as fallback
      }
    );
    
    var domain = window.location.host
    var protocol = window.location.protocol
    // this.loginUrl = protocol+'//'+domain+'/login'
  }


  ngOnInit(): void {}
    onSubmit(formDirective: FormGroupDirective){
      this.spinner.show()
      if(this.signupForm.invalid){
        this.spinner.hide()
        return
      }else{
        this.signupForm.value['username'] = this.sf.email.value
        this.signupForm.value['state'] = ''
        this.errors=''
        this.auth.postAPI('signup/',this.signupForm.value).subscribe(data => {
          var time = new Date().getTime();
          let tm = time+12*60*60*1000
          localStorage.setItem('token',data['token']);
          localStorage.setItem('userdata',JSON.stringify(data));
          localStorage.setItem('tm',JSON.stringify(tm))
          localStorage.setItem('userPermissions',JSON.stringify(data['permission']))

          formDirective.resetForm();
          this.spinner.hide();
          this.router.navigate(['']);

          // const dialogRef = this.dialog.open(InformationComponent,{
          //   width:'55%',
          //   data:{
          //     signup:data,
          //   }
          // })
        },error =>{
          this.spinner.hide()
          this.errors = error.error.detail
          if(error.error.mobile){
            this.errors = error.error.mobile[0]
          }
          if(error.error.email){
            this.errors = error.error.email[0]
          }
          if(error.error.cpassword){
            this.errors = "Those Password didn't match. Please try again"
          }
        })
      }
    }
  
    passwordMatchFunction(){
      if(this.signupForm.get('password')?.value != this.signupForm.get('cpassword')?.value){
        this.passwordMatch = false
      }else{
        this.passwordMatch = true
      }
    }
  
  }


