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
import { TankDataFormComponent } from 'src/app/shared/dialogs/project/tank-data-form/tank-data-form.component';

export interface TankDataItem {
  tank_detail:any;
  id: number;
  tank: number;
  slots: number;
  strength: number;
  temperature: number;
  acidc: number;
  ironc: number;
  ph: number;
  zinc_ash:number;
  strengthsdc: number;
  density: number;
  timestamp: Date;
  utimestamp: Date;
}

@Component({
  selector: 'app-tank-data',
  templateUrl: './tank-data.component.html',
  styleUrls: ['./tank-data.component.scss']
})

export class TankDataComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TankDataItem>;
  tableData: TankDataItem[] = [];
  dataSource = new MatTableDataSource<TankDataItem>(this.tableData);
  displayedColumns = ['tank' ,'type' ,'slots' ,'strength' ,'temperature' ,'acid_content' ,'iron_content' ,'density' ,'ph' ,'str_sdc','zinc_ash','date', 'action'];
  apiUrl = '';
  error: any;
  constructor(
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute
  ) {
    // this.dataSource = new TankDataSource();
    this.spinner.show();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.auth.getAPI('tank-data/').subscribe((responce) => {
      this.dataSource.data = this.dataSource.data.concat(responce.results);
      if (responce.next != null) {
        this.apiUrl = responce.next.split('?')[1];
        this.loadData();
      }
      this.spinner.hide();
    });
  }
  newTankData() {
    let dialogRef =this.dialog.open(TankDataFormComponent,{
      width:"50%",
      data:{
        title:"New Tank Data"
      }
    });
    dialogRef.afterClosed().subscribe(responce => {
      if(responce){
        this.dataSource.data.push(responce)
        this.dataSource._updateChangeSubscription()
      }
    });
  }
  editTankData(i:number){
    console.log( this.dataSource.data[i])
	let editDialog = this.dialog.open(TankDataFormComponent,{
		width: "50%",
		data : {
			title : "Edit Tank Data",
			myData : this.dataSource.data[i]
		}
	});
	editDialog.afterClosed().subscribe(responce=>{
		if (responce){
			this.dataSource.data[i] = responce
			this.dataSource._updateChangeSubscription()
		}
	})
  }
  deleteDialog(indx:number){
    let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Tank Data',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				console.log(id)
				this.auth.patchAPI('tank-data/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
					this.error = error.error.detail
					//console.log(error.error.detail,'eeeeeeeeeeeeeeeeee')
				})
			}
		});
  }
  doFilter = (value: any | null) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
