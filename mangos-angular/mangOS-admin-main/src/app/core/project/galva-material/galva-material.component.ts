import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogModule } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component';
import { GalvaJobCardFormComponent } from 'src/app/shared/dialogs/project/galva-job-card-form/galva-job-card-form.component';
import { GalvaMaterialFormComponent } from 'src/app/shared/dialogs/project/galva-material-form/galva-material-form.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface GalvaMaterial {
  id: number;
  project: number;
  section: number;
  name: string;
  material_type: string;
  length: number;
  width: number;
  thickness: number;
  weight: number;
  min_coating_required:number;
}
@Component({
  selector: 'app-galva-material',
  templateUrl: './galva-material.component.html',
  styleUrls: ['./galva-material.component.scss'],
})
export class GalvaMaterialComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GalvaMaterial>;
  tableData: GalvaMaterial[] = [];
  dataSource = new MatTableDataSource<GalvaMaterial>(this.tableData);
  selection = new SelectionModel<GalvaMaterial>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'select',
    'section',
    'name',
    'material_type',
    'length',
    'width',
    'thickness',
    'weight',
    'min_coating_required'
  ];

  apiUrl = '';
  error: any;
  selectedProj: any;
  projectSlug: any;
  projectList: any;
  sproject = new FormControl();
 	rowSelected:Boolean = false;
  sectionList: any;
  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.spinner.show();

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.auth.getAPI('project/').subscribe((result) => {
      this.projectList = result['results'];
    });

    this.auth.getAPI('section/').subscribe((result) => {
      console.log(result, 'section listttttttt');
      this.sectionList = result['results'];
      this.spinner.hide();
    });

    this.projectSlug = this._route.snapshot.paramMap.get('slug');
    if (this.projectSlug == null) {
      if (localStorage.getItem('selectedproject')) {
        this.projectSlug = localStorage.getItem('selectedproject');
        this.projectGalva(this.projectSlug);
        this.sproject.setValue(this.projectSlug);
        this.selectedProj = this.projectSlug;
      } else {
        this.projectSlug = '';
      }
    } else {
      localStorage.setItem('selectedproject', this.projectSlug);
      this.sproject.setValue(this.projectSlug);
      this.selectedProj = this.projectSlug;
      this.loadData();
    }

    // this.loadData()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit() {}
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  addGalvaMeterial(){
    const dialogRef = this.dialog.open(GalvaMaterialFormComponent, {
			data:{
				projects:this.projectList,
				sections:this.sectionList,
        selectedP:this.selectedProj,
			}
		})
		dialogRef.afterClosed().subscribe(response=>{
			if(response){
				console.log(response, 'new bom addedddddd')
                this.dataSource.data.push(response);
				console.log(this.dataSource.data,'bom datasource')
				// this.updateValue(this.dataSource.data)
        		this.dataSource._updateChangeSubscription();
				// this.loadData()
			}
		});
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  loadData() {
    this.auth
      .getAPI('galva-material/?project__slug=' + this.projectSlug)
      .subscribe((responce) => {
        this.dataSource.data = this.dataSource.data.concat(responce.results);
        if (responce.next != null) {
          this.apiUrl = responce.next.split('?')[1];
          this.loadData();
        }
        this.spinner.hide();
      });
  }
  applyFilter(value: any | null){
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}
  addNewGalvaJobCard(){
		// console.log(this.selection.selected,'111111111111')
	    if(this.selection.selected.length>0){
	    	const dialogRef = this.dialog.open(GalvaJobCardFormComponent,{
	    		data:{
	    			itemList:this.selection.selected,
	    			project:this.projectList,
	    			selectedP:this.selectedProj,
	    			section:this.sectionList
	    		}	
	    	})
			dialogRef.afterClosed().subscribe(result => {
				if(result){
					this._snackBar.open('Job-Card Created','', {duration: 5000, panelClass: ['greenTSnackbar']});
				}
			});

	    }else{
            this._snackBar.open('Select atleast one row of item.','', {duration: 5000, panelClass: ['redBOMSnackbar']});
	    }
	    console.log(this.rowSelected, '00000000000')
	}
  downloadFile(fileType:string){
		// console.log(fileType)
		this.auth.getAPI('export/?type='+fileType).subscribe(res=>{
			if(fileType=='pdf'){
				window.open(res.results.file,'_blank')
			}else{
				window.location.href = res.results.file
			}
			// console.log(res)
		})
	}
  projectGalva(data: any) {
    console.log(data, 'select projecttttt');
    this.selectedProj = data;
    this.router.navigate(['/project/galva-material/' + data]);
  }
}
