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
    this.auth.getAPI('country/').subscribe(result=>{
      this.countryList = result['results']
    })
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


