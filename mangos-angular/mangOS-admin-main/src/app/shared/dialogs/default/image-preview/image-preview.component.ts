import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer} from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ImagePreviewComponent implements OnInit {
  pdf:boolean=false;
  image:boolean=false
  pdfurl:any
  file:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private auth:AuthenticationService,private sanitizer: DomSanitizer) { 
    if(this.data.file['file'].slice(this.data.file['file'].length - 3)=="pdf"){
    // console.log(this.data.file['file'].split('.')[1],'hhhhhhhhhhhhhhhhhhhh')
    this.pdf=true;
  }else if(this.data.file['extension']=="Image"){
    this.image=true
    // console.log(this.data.file['file'].split('.')[1],'hhhhhhhhhhhhhhhhhhhh')
  }
  this.pdfurl=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.file['file'])
  this.file=this.data.file
}

  ngOnInit(): void {
    console.log(this.data.file['file'],'link')
  }
  downloadFile(file:any){
		this.auth.download(file.file).subscribe(blob=>saveAs(blob,file.name)
    )}
}
