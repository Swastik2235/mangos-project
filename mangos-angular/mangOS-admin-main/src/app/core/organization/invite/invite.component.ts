import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { InviteFormComponent } from 'src/app/shared/dialogs/organization/invite-form/invite-form.component';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';


export interface InviteItem {
  id: number;
  company: string;
  user: string;
  email: string;
  role: string;
  status : string;
  action : string;
}

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InviteComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<InviteItem>;

  tableData:InviteItem[]=[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  dataSource = new MatTableDataSource<InviteItem>(this.tableData);
  displayedColumns = ['id','company','user', 'email','role','status','action'];
  invites:any;

  addInvitePermission =true;
  editInvitePermission = true;
  deleteInvitePermission = true;
  viewInvitePermission = true;

  constructor(private auth:AuthenticationService,private _snackBar:MatSnackBar, private spinner: NgxSpinnerService,public dialog: MatDialog) {
    this.spinner.show();
    this.auth.getAPI('invite/').subscribe(data => {
      this.invites = data['results'];
      this.dataSource.data = this.invites;
      this.spinner.hide();
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(value: any | null){
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  newInviteForm(){
    const dialogRef = this.dialog.open(InviteFormComponent,{
      width:'30%',
      panelClass:'inviteAddModal',
    })
    dialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.dataSource.data.push(response);
        this.dataSource._updateChangeSubscription();
        this._snackBar.open('Invitation send.','', {duration: 5000, panelClass: ['greenPSSnackbar']});
      }
    })
  }

  deleteDialog(indx:number){
    let dialogRef =this.dialog.open(DeleteComponent,{
      width:"25%",
      data:{
        title: 'Invite',
        delete:'true',
        indx: indx
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.spinner.show();
      if(result!=='false'){
        let id = this.dataSource.data[result].id
        this.auth.patchAPI('invite/'+ id +'/',{'status':'Inactive'}).subscribe(responce=>{
          this.dataSource.data.splice(result,1);
          this.dataSource._updateChangeSubscription();
          this.spinner.hide();
          this._snackBar.open('Delete Invitation.','', {duration: 5000, panelClass: ['redInviteAddSnackbar']});

        },error =>{
          this.spinner.hide();

          let errorDetail = [error.error['detail']]
          for(let i=0;i<error.error.objects.length;i++){
            errorDetail.push('Table :'+error.error.objects[i]['model']+', Title : '+error.error.objects[i]['title'])
          }
          this.dialog.open(DeleteComponent,{
            width:"30%",
            data:{
              title: 'Error',
              error : errorDetail,
            }
          });
        })
      }
    });
    
  }

  resendInvitation(data:any, index:any){
    console.log(data, index, 'edit inviteeee')
    const dialogRef = this.dialog.open(InviteFormComponent,{
      width:'30%',
      panelClass:'inviteAddModal',
      data:{
        invite:data,
      }
    })
    dialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.dataSource.data[index]=response;
        this.dataSource._updateChangeSubscription();
        this._snackBar.open('Resend Invitation done.','', {duration: 5000, panelClass: ['greenPSSnackbar']});
      }
    })
  }

  reSendInvitation(data:any,index:number){

  }
}
