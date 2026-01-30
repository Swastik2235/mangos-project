import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss']
})
export class OperationFormComponent implements OnInit {

  operationForm = this.fb.group({
    title :[null,Validators.required],
    content :[null, Validators.required],
    machine :[null, Validators.required],
    code :[null, Validators.required],
  });

  machineList:any = [];
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<OperationFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) {
    if(this.data.machines){
      this.machineList = this.data.machines;
    }
    if(this.data.myData){
      let data = this.data.myData
      this.operationForm.controls['title'].setValue(data.title)
      this.operationForm.controls['content'].setValue(data.content)
      this.operationForm.controls['machine'].setValue(data.machine)
      this.operationForm.controls['code'].setValue(data.code)
    }
  }

  ngOnInit(): void {
    
  }

  closeDialog(){
    this.dialogRef.close()
  }

  addOperationData(){
    if(this.operationForm.invalid){
      return
    }else{
      if(this.data.myData){
        this.auth.patchAPI('operation/'+this.data.myData.id+'/',this.operationForm.value).subscribe(result=>{
          this.dialogRef.close(result)
        })
      }else{
        this.auth.postAPI('operation/',this.operationForm.value).subscribe(result=>{
          this.dialogRef.close(result)
        })
      }
    }
  }
}
