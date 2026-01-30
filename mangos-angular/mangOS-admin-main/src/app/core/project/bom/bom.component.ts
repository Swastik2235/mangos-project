import { AfterViewInit, Component, ViewChild,ViewEncapsulation, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource,MatTable } from '@angular/material/table';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ImportBomFormComponent } from 'src/app/shared/dialogs/project/import-bom-form/import-bom-form.component'
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component';
import { JobCardFormComponent } from '../../../shared/dialogs/project/job-card-form/job-card-form.component'
import { AddbomFormComponent } from '../../../shared/dialogs/project/addbom-form/addbom-form.component';

export interface BomItem {
	id:number;
	project: string;
	section: string;
	mark: string;
	tower_quantity : string;
	length : string;
	width : string;
	unit_weight : string;
	piece_weight : string;
	quantity : string;
	number : string;
	total_weight : string;
	total_quantity : string;
	note : string;
	weight : string;
	operation:string;
}

@Component({
	selector: 'app-bom',
	templateUrl: './bom.component.html',
	styleUrls: ['./bom.component.scss'],
	encapsulation:ViewEncapsulation.None
})
export class BomComponent implements OnInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<BomItem>;
	// dataSource: BomDataSource;
	tableData:BomItem[]=[];
	dataSource = new MatTableDataSource<any>(this.tableData);
	selection = new SelectionModel<BomItem>(true, []);
	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['select','mark', 'number', 'section', 'length', 'width', 'unit_weight', 'piece_weight', 'quantity', 'tower_quantity', 'weight','operation','total_quantity','total_weight', 'action'];
	projectList:any=[];
	sectionList:any=[];
	bomData:any = [];
	limit = '100'
	nextPage='';
	project__slug='';
	projectSlug:any;
  	sproject = new FormControl();
  	error:any
  	rowSelected:Boolean = false;
  	editRowIndex:any;
	isEditableNew: Boolean = false;
	selectedProj: any;
  	VOForm = this.fb.group({
    	jobitems:this.fb.array([this.fb.group({
          	id: [''],
          	title:[''],
	        project: [''],
	        section: [''],
	        mark: [''],
	        tower_quantity: [''],
	        length: [''],
	        width: [''],
	        unit_weight: [''],
	        piece_weight: [''],
	        quantity: [''],
	        number: [''],
	        note: [''],
			operation:[''],
	        weight: [''], //end of fb array
			isEditable: false,
	    })])
    });

    get jobitems(){
		return this.VOForm.get('jobitems') as FormArray;
	}
 //    get VORows(){
	// 	return this.VOForm.get('VORows') as FormArray;
	// }
	constructor(private _formBuilder: FormBuilder, private fb:FormBuilder,private _snackBar:MatSnackBar,private auth : AuthenticationService,public dialog: MatDialog,private spinner: NgxSpinnerService,private _route:ActivatedRoute, private router:Router) {
		// this.dataSource = new BomDataSource();
		this.spinner.show()

		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
		this.auth.getAPI('project/').subscribe(result=>{
			this.projectList = result['results']
		})

		this.auth.getAPI('section/').subscribe(result=>{
			console.log(result, 'section listttttttt')
			this.sectionList = result['results']
			this.spinner.hide()
		})
		
		this.projectSlug = this._route.snapshot.paramMap.get('slug')
		if(this.projectSlug==null){
			if(localStorage.getItem('selectedproject')){
				this.projectSlug=localStorage.getItem('selectedproject')
			this.sproject.setValue(this.projectSlug);
			this.projectBom(this.projectSlug)
			this.selectedProj = this.projectSlug;
			}
			else{
				this.projectSlug = ''
			}
		}
		else{
			localStorage.setItem('selectedproject',this.projectSlug)
			this.sproject.setValue(this.projectSlug);
			this.selectedProj = this.projectSlug;
			this.loadData()
		}
		
		// this.loadData()
		
	}

	ngOnInit(): void {
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
	    const numSelected = this.selection.selected.length;
	    const numRows = this.dataSource.data.length;
	    return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
		  this.selection.clear();
		  return;
		}
		this.selection.select(...this.dataSource.data);
	}

	ngAfterViewInit(): void {
		if(this.projectSlug.length > 1){
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
			this.table.dataSource = this.dataSource;
		}
		
	}

	loadData(){
		if(this.projectSlug.length > 1){
			this.auth.getAPI('bom/?'+this.nextPage+'&size=500&project__slug='+this.projectSlug).subscribe(result=>{
				this.dataSource.data = this.dataSource.data.concat(result.results);
				if(result.next != null){
					this.nextPage = result.next.split('?')[1]
					this.nextPage = this.nextPage.split('&')[0]
					this.loadData()
					// console.log(this.nextPage )
				}
				this.updateValue(this.dataSource.data)
				this.spinner.hide()
			})
		}
	}

	updateValue(data:any){
		console.log(data, 'updateddddddd tableeees')
		this.jobitems.removeAt(0);
		data.forEach((x:any) => {
			this.jobitems.push(this.fb.group({
				id:x.id,
				project:x.project,
				section:x['section_detail']['title'],
				mark:x['mark_detail']['title'],
				tower_quantity:x.tower_quantity,
				length:x.length,
				width:x.width,
				unit_weight:x.unit_weight,
				piece_weight:x.piece_weight,
				quantity:x.quantity,
				number:x.number,
				note:x.note,
				weight:x.weight,
				operation:x['operation'],
				isEditable:false,
			}))
		})
	}

	addNewJobCard(){
		// console.log(this.selection.selected,'111111111111')
	    if(this.selection.selected.length>0){
	    	const dialogRef = this.dialog.open(JobCardFormComponent,{
	    		data:{
	    			bomlist:this.selection.selected,
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


	applyFilter(value: any | null){
		this.dataSource.filter = value.trim().toLocaleLowerCase();
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

	importBomFile(){
		const dialogRef = this.dialog.open(ImportBomFormComponent, {
			width:'25%',
			data:{
				projects:this.projectList
			}
		})
		dialogRef.afterClosed().subscribe(response=>{
			if(response){
                this._snackBar.open('File Uploaded.','', {duration: 5000, panelClass: ['greenTSnackbar']});
			}
		})
	}
	addBomFile(){
		const dialogRef = this.dialog.open(AddbomFormComponent, {
			data:{
				projects:this.projectList,
				sections:this.sectionList
			}
		})
		dialogRef.afterClosed().subscribe(response=>{
			if(response){
				console.log(response, 'new bom addedddddd')
                this.dataSource.data.push(response);
				console.log(this.dataSource.data,'bom datasource')
				this.updateValue(this.dataSource.data)
        		this.dataSource._updateChangeSubscription();
				// this.loadData()
			}
		});
	}

	projectBom(data:any){
		console.log(data, 'select projecttttt')
		this.selectedProj = data;
		this.router.navigate(['/project/bom/'+data]);
	}

	deleteDialog(indx:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'Bom',
				delete:'true',
				indx: indx
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result!=='false'){
				let id = this.dataSource.data[result].id
				this.auth.patchAPI('bom/'+ id,{'status':'Delete'} ).subscribe(responce=>{
					this.dataSource.data.splice(result,1);
					this.dataSource._updateChangeSubscription()
				},error =>{
					this.error = error.error.detail
					//console.log(error.error.detail,'eeeeeeeeeeeeeeeeee')
				})
			}
		});
	}

	EditSVO(data:any,element:any, index:number) {
		console.log(index,element.id)
		this.isEditableNew = true
		// this.editRowIndex = data.value[index]['id'];
		this.editRowIndex = element.id;
		// console.log(this.editRowIndex == element.id,'rrrrrrrrr')
	}


	SaveVO(data:any,element:any ,i:number){
		this.isEditableNew = false
		console.log(data.value[i], '99999999999')
		data.value[i]['mark']=element['mark']
		data.value[i]['section']=element['section']
		this.auth.patchAPI('bom/'+element['id']+'/',data.value[i]).subscribe(result=>{
			console.log(result,'345345345435345435')
			this.dataSource.data[i] = result
			this.dataSource._updateChangeSubscription()
		})
	}

	CancelSVO(data:any, i:number){
		this.isEditableNew = false
		// this.dataSource.data.find()
		// console.log(data, i, '99999999999')
	}
}
