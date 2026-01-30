import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrls: ['./invite-form.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class InviteFormComponent implements OnInit {

  errors:any;
  resend:any;
  roleList:any;
  companyList:any;
  editInvite:any;
  resendInvite:Boolean = true;
  inviteAddForm = this.fb.group({
    email:[null,[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    role:[null,Validators.required],
    company:[null,Validators.required],
    name:[null,Validators.required],
  })
  get inf() { return this.inviteAddForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private _snackBar:MatSnackBar, private spinner:NgxSpinnerService ,private dialogRef:MatDialogRef<InviteFormComponent>, private auth:AuthenticationService, private fb:FormBuilder) {
    console.log(data, 'edit innnn');
    if(data != null && data['invite']){
      console.log(data, 'yess edit innnn');
      this.editInvite = data['invite'];
      this.resendInvite = false;
    }
  }

  ngOnInit(): void {
    this.getRole();
    this.getCompany();
    if(this.editInvite){
      this.inviteAddForm.controls.role.setValue(this.editInvite['role']);
      this.inviteAddForm.controls.company.setValue(this.editInvite['company']);
      this.inviteAddForm.controls.name.setValue(this.editInvite['name']);
      this.inviteAddForm.controls.email.setValue(this.editInvite['email']);
    }
  }

  inviteAddFormSubmit(){
    if(this.inviteAddForm.invalid){
       return;
    }else{
      this.spinner.show();
      if(this.editInvite){
        console.log(this.inviteAddForm.value,'resend form valueeeeeeeeeeee');
        this.inviteAddForm.value['verified']=false
        this.auth.patchAPI('invite/'+this.editInvite.id+'/',this.inviteAddForm.value).subscribe(result=>{
          this.spinner.hide()
          this.dialogRef.close(result)
        },error=>{
          console.log(error.error)
          if(error.error.non_field_errors){
            this.errors = 'You have already send invitation on this email id'
          }
          this.spinner.hide()
        })
      }else{
        console.log(this.inviteAddForm.value,'form valueeeeeeeeeeee');
        this.auth.postAPI('invite/',this.inviteAddForm.value).subscribe(result=>{
          this.spinner.hide()
          this.dialogRef.close(result)
        },error=>{
          console.log(error.error)
          if(error.error.non_field_errors){
            this.errors = 'You have already send invitation on this email id'
          }
          this.spinner.hide()
        })
      }
    }
  }

  getRole(){
    this.auth.getAPI('group/').subscribe(result=>{
      this.roleList=result['results'];
    })
  }
  getCompany(){
    this.auth.getAPI('company/').subscribe(result=>{
      this.companyList=result['results'];
    })
  }

}
