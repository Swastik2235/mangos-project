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
import { TankFormComponent } from 'src/app/shared/dialogs/project/tank-form/tank-form.component';

export interface TankItem {
  id: number;
  slug: string;
  title: string;
  content: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss'],
})
export class TankComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TankItem>;
  tableData: TankItem[] = [];
  dataSource = new MatTableDataSource<TankItem>(this.tableData);
  displayedColumns = ['title', 'content', 'type', 'action'];
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
    this.loadData();
  }
  loadData() {
    this.auth.getAPI('tank/').subscribe((responce) => {
      this.dataSource.data = this.dataSource.data.concat(responce.results);
      if (responce.next != null) {
        this.apiUrl = responce.next.split('?')[1];
        this.loadData();
      }
      this.spinner.hide();
    });
  }
  addTank() {
	let dialogRef =this.dialog.open(TankFormComponent,{
		width:"25%",
		data:{
			title:"Add Tank"
		}
	});
	dialogRef.afterClosed().subscribe(responce => {
		if(responce){
			this.dataSource.data.push(responce)
			this.dataSource._updateChangeSubscription()
		}
	});
  }
  editTank(i:number){
	console.log( this.dataSource.data[i])
	let editDialog = this.dialog.open(TankFormComponent,{
		width: "25%",
		data : {
			title : "Edit Tank",
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
				title: 'Tank',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].slug
				console.log(id)
				this.auth.patchAPI('tank/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
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
