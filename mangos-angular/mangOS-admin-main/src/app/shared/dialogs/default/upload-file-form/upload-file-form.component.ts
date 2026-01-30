import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-upload-file-form',
  templateUrl: './upload-file-form.component.html',
  styleUrls: ['./upload-file-form.component.scss']
})
export class UploadFileFormComponent implements OnInit {

  uploadFileForm = this.fb.group({
    file :[null,Validators.required],
  });
  folderDetail:any;
  loginUser:any;
  file:any;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<UploadFileFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private auth:AuthenticationService) {
    this.folderDetail = data.folder;
    this.loginUser = data.loginUser;
    if(data.file){
      this.file = data.file;
    }
  }

  ngOnInit(): void {
  }

  uploadFileData(){

  }

  closeDialog(){
    this.dialogRef.close()
  }

  onFileDropped(event:any){
    const fileData = event.target.files;
    const fileName = fileData[0].name
    const size = (fileData[0].size * 0.000001).toFixed(4);
    var extention = fileData[0].name.split('.')
    var fileExtention 
    if(extention[1] == 'jpg' || extention[1] == 'jpeg' || extention[1] == 'png'){
      fileExtention = 'Image'
    }else if (extention[1] == 'zip' || extention[1] =='json' || extention[1] =='xlsx' || extention[1] =='csv' ){
      fileExtention = 'Document'
    }else{
      fileExtention = 'Other'
    }
    if(this.file){
      this.auth.patchForm2('document/'+this.file.id+'/',[{'folder':this.folderDetail.id},{'file':fileData[0]},{'user':this.loginUser.id},{'title':extention[0]},{'name':fileName},{'extension':fileExtention},{'size':size}]).subscribe(result=>{
        this.dialogRef.close(result)
      })
    }else{
      this.auth.postForm2('document/',[{'folder':this.folderDetail.id},{'file':fileData[0]},{'user':this.loginUser.id},{'title':extention[0]},{'name':fileName},{'extension':fileExtention},{'size':size}]).subscribe(result=>{
        this.dialogRef.close(result)
      })
    }
  }
  addData(){
		
    }
}
