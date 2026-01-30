import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {

  addFolderForm = this.fb.group({
    title :[null,Validators.required],
    color :[null, Validators.required],
    company :[null, Validators.required],
    user :[null, Validators.required],
  });
  userList:any = [];
  companyList:any = [];
  folderDetail:any;
  subfolder:Boolean = false;
  folderD:any;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<DocumentFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private auth:AuthenticationService) {
    if(this.data.users && this.data.company){
      this.userList = this.data.users;
      this.companyList = this.data.company;
    }
    if(this.data.subfolder && this.data.folder){
      this.subfolder = this.data.subfolder;
      this.folderD = this.data.folder;
    }

  }

  ngOnInit(): void {
    if(this.data.folderDetail){
      this.folderDetail = this.data.folderDetail
      console.log(this.folderDetail, 'edit folder detailllllllllllllllll')
      this.addFolderForm.controls['title'].setValue(this.folderDetail.title)
      this.addFolderForm.controls['color'].setValue(this.folderDetail.color)
      this.addFolderForm.controls['company'].setValue(this.folderDetail.company)
      this.addFolderForm.controls['user'].setValue(this.folderDetail.user)
    }
  }

  closeDialog(){
    this.dialogRef.close()
  }

  addFolderData(){
    if(this.addFolderForm.invalid){
      return
    }else{
      if(this.folderDetail){
        this.auth.patchAPI('folder/'+this.folderDetail.id+'/',this.addFolderForm.value).subscribe(result=>{
          this.dialogRef.close(result)
        })
      }else if(this.subfolder == true && this.folderD){
        this.addFolderForm.value['sub_folder'] = this.folderD.id;
        console.log(this.addFolderForm.value, 'add new sub folderrrrr')
        this.auth.postAPI('folder/',this.addFolderForm.value).subscribe(result=>{
          this.dialogRef.close(result)
        })
      }
      else{
        this.auth.postAPI('folder/',this.addFolderForm.value).subscribe(result=>{
          this.dialogRef.close(result)
        })
      }
    }
  }
}
