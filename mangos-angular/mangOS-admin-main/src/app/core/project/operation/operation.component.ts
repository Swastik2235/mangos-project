import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component';
import { MachineFormComponent } from 'src/app/shared/dialogs/project/machine-form/machine-form.component';
import { OperationFormComponent } from 'src/app/shared/dialogs/project/operation-form/operation-form.component'


export interface MachineItem {
  id:number;
  machine:string;
  title: string;
  code: string;
  content: string;
  action:string;
}

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MachineItem>;
  tableData:MachineItem[]=[];
  dataSource = new MatTableDataSource<MachineItem>(this.tableData);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','machine', 'title', 'code', 'content','action'];
  apiUrl = '';
  error:any;
  machineList:any=[];
  constructor(private auth : AuthenticationService, public dialog: MatDialog, private spinner: NgxSpinnerService, private _route:ActivatedRoute) {
    this.spinner.show()
    this.auth.getAPI('machine/').subscribe(result=>{
      this.machineList = result['results']
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(){
    this.loadData()
  }

  loadData(){
    this.auth.getAPI('operation/').subscribe(responce=>{
      this.dataSource.data = this.dataSource.data.concat(responce.results);
      if(responce.next != null){
        this.apiUrl = responce.next.split('?')[1]
        this.loadData()
      }
      this.spinner.hide();
    })
  }


  addOperation(){
    let dialogRef =this.dialog.open(OperationFormComponent,{
      width:"25%",
      data:{
        title:"Add Operation",
        machines:this.machineList
      }
    });
    dialogRef.afterClosed().subscribe(responce => {
      if(responce){
        this.dataSource.data.push(responce)
        this.dataSource._updateChangeSubscription()
      }
    });
  }

  editOperation(indx:number){
    console.log( this.dataSource.data[indx])
    let editDialog = this.dialog.open(OperationFormComponent,{
      width: "25%",
      data : {
        title : "Edit Operation",
        myData : this.dataSource.data[indx],
        machines:this.machineList
      }
    });
    editDialog.afterClosed().subscribe(responce=>{
      if (responce){
        this.dataSource.data[indx] = responce
        this.dataSource._updateChangeSubscription()
      }
    })
  }

  deleteOperationDialog(indx:number){
    let dialogRef =this.dialog.open(DeleteComponent,{
      width:"25%",
      data:{
        title: 'Operation',
        delete:'true',
        indx: indx
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=='false'){
        let id = this.dataSource.data[result].id
        console.log(id)
        this.auth.patchAPI('operation/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
          this.dataSource.data.splice(result,1);
          this.dataSource._updateChangeSubscription()
        },error =>{
          this.error = error.error.detail
        })
      }
    });
  }

  doFilter = (value: any | null) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
