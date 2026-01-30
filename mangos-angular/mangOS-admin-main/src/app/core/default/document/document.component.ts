import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DocumentFormComponent } from 'src/app/shared/dialogs/default/document-form/document-form.component'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  folderList:any = [];
  userList:any = [];
  companyList:any = [];
  folderSearch:any;
  constructor(private spinner:NgxSpinnerService, private auth:AuthenticationService, private dialog:MatDialog) {
    this.spinner.show();
    this.auth.getAPI('folder/?parent=true').subscribe(result=>{
      this.folderList = result['results'];
    })
    this.auth.getAPI('user/').subscribe(result=>{
      this.userList = result['results'];
    })
    this.auth.getAPI('company/').subscribe(result=>{
      this.companyList = result['results'];
    })
    this.spinner.hide();

  }

  ngOnInit(): void {
  }

  addNewFolder(){
    let dialogRef =this.dialog.open(DocumentFormComponent,{
      width:"25%",
      data:{
        title:"Add New Folder",
        users:this.userList,
        company:this.companyList,
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.folderList.unshift(response);
      }
    });
  }

  doFilter = (value: any | null) => {

  }

}
