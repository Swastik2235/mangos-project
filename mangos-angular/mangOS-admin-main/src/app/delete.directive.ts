import { Directive, ElementRef,HostListener,Input } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { DeleteComponent } from './shared/dialogs/default/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  @Input() appDelete = '';
  constructor(private el: ElementRef,private auth: AuthenticationService,private dialog: MatDialog) {

  }
  @HostListener('click', ['$event.target'])
  onClick() {
    let dialogRef =this.dialog.open(DeleteComponent,{
      width:"25%",
    data:{
      title: 'File',
      delete:'true',
      indx: 1
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result!=='false'){
      this.auth.patchAPI(this.appDelete,{'status':'Delete'} ).subscribe(responce=>{
        console.log(this.appDelete,responce)
      },error =>{
        // this.error = error.error.detail;
      })
    }
    })
}
}