import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../shared/dialogs/default/delete/delete.component';
import { ImagePreviewComponent } from '../../../shared/dialogs/default/image-preview/image-preview.component';
import { DocumentFormComponent } from 'src/app/shared/dialogs/default/document-form/document-form.component'
import { UploadFileFormComponent } from 'src/app/shared/dialogs/default/upload-file-form/upload-file-form.component'
// import { saveAs } from 'file-saver';
import * as Highcharts from 'highcharts/highcharts-gantt.js';
import ganttChart from 'highcharts/modules/gantt';
ganttChart(Highcharts)

export interface DocumentsItem {
  id:number;
  name:string;
  size: string;
  action:string;
  check:boolean;
}

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DocumentsItem>;
  tableData:DocumentsItem[]=[];
  dataSource = new MatTableDataSource<DocumentsItem>(this.tableData);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'size', 'action','check'];

  userList:any = [];
  companyList:any = [];
  folderId:any;
  folderDetail:any;
  loginUser:any;
  error:any;
  subfolderList:any=[];
  documentList : any=[];
  docTitle : any=[];
  chartOption: any={
    chart:{type:'gantt'},
    title: {
        text: 'Highcharts Gantt Chart'
    },

    subtitle: {
        text: 'With custom symbols in data labels'
    },

    xAxis: {
        minPadding: 0.05,
        maxPadding: 0.05
    },

    yAxis: {
      categories:this.docTitle
    },

    tooltip: {
        outside: true
    },

    series: [{
        name: 'Project 1',
        type:'gantt',
        data:[],
        dataLabels: [{
            enabled: true,
            format: '<div style="width: 20px; height: 20px; overflow: hidden; border-radius: 50%; margin-left: -25px">' +
                '<img src="{point.id}" ' +
                'style="width: 30px; margin-left: -5px; margin-top: -2px"></div>',
            useHTML: true,
            align: 'left'
        }]
    }]
};
  chartdata : any=[];
  constructor(private router:Router, private activeRoute : ActivatedRoute, private spinner:NgxSpinnerService, private auth:AuthenticationService, private dialog:MatDialog) {
    this.spinner.show();
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
    const toTimestamp = (strDate: string) => {  
      const dt = Date.parse(strDate);  
      return dt;  
    }  
    this.folderId = this.activeRoute.snapshot.paramMap.get('id');
    if(this.folderId){
      this.auth.getAPI('folder/'+this.folderId+'/?parent=false').subscribe(result=>{
        this.folderDetail = result;
        this.subfolderList = this.folderDetail['subfolder'];
        this.dataSource.data = this.folderDetail.documents;
        this.documentList=this.folderDetail['documents']

        for(let i in this.documentList){
          this.docTitle.push(this.documentList[i]['title'])
          for(let j in this.documentList[i]['documentcheck']){
            this.chartdata.push({id:this.documentList[i]['documentcheck'][j]['users']['image'],start:toTimestamp(this.documentList[i]['documentcheck'][j]['timestamp']),end:40000000+toTimestamp(this.documentList[i]['documentcheck'][j]['timestamp']),y:parseInt(i)})
          }
          console.log(this.documentList[i]['title'],'ssssssssssssssss')
        }
        console.log(this.chartdata,'qqqqqqqqqq')
        console.log(this.documentList,'pppppppppp')
        console.log('h1')
        this.chartOption.series[0].data = this.chartdata
        Highcharts.ganttChart('container',this.chartOption)
      })
    }
    this.auth.getAPI('user/').subscribe(result=>{
      this.userList = result['results'];
    })
    this.auth.getAPI('company/').subscribe(result=>{
      this.companyList = result['results'];
    })
    this.loginUser = this.auth.profile();
    this.spinner.hide();
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ImagePreview(file: any){
		this.dialog.open(ImagePreviewComponent,{
			data:{file:file}
		});
	}
  
  editFolder(type:any){
    let dialogRef =this.dialog.open(DocumentFormComponent,{
      width:"25%",
      data:{
        title:"Edit Folder",
        users:this.userList,
        company:this.companyList,
        folderDetail:this.folderDetail
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.folderDetail = response;
        this.router.navigate(['document']);
      }
    });
  }

  addNewSubFolder(){
    let dialogRef =this.dialog.open(DocumentFormComponent,{
      width:"25%",
      data:{
        title:"Add New Sub Folder",
        users:this.userList,
        company:this.companyList,
        subfolder:true,
        folder:this.folderDetail
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.subfolderList.unshift(response);
      }
    });
  }

  documentFileUpload(){
    let dialogRef =this.dialog.open(UploadFileFormComponent,{
      width:"30%",
      data:{
        title:"Upload File",
        folder:this.folderDetail,
        loginUser:this.loginUser
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.dataSource.data.push(response);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  deleteFileDialog(indx:number){
    let dialogRef =this.dialog.open(DeleteComponent,{
      width:"25%",
      data:{
        title: 'File',
        delete:'true',
        indx: indx
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=='false'){
        let id = this.dataSource.data[result].id;
        this.auth.patchAPI('document/'+ id+'/',{'status':'Delete'} ).subscribe(responce=>{
          this.dataSource.data.splice(result,1);
          this.dataSource._updateChangeSubscription();
        },error =>{
          this.error = error.error.detail;
        })
      }
    });
  }

  editUploadFile(indx:number){
    let file = this.dataSource.data[indx]
    let dialogRef =this.dialog.open(UploadFileFormComponent,{
      width:"30%",
      data:{
        title:"Edit Upload File",
        folder:this.folderDetail,
        loginUser:this.loginUser,
        file:file
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.dataSource.data[indx] = response;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  checked(event:any,indx:number){
    let data={'document':event,'user':this.loginUser.id}
    this.auth.postAPI('documentchecked/',data).subscribe(res=>{
        this.dataSource._updateChangeSubscription();
    }
      )
    // this.auth.patchAPI('document/'+ event+'/',{'checkedby':this.loginUser.id}).subscribe(response=>{
    //     this.dataSource.data[indx] = response;
    //     this.dataSource._updateChangeSubscription();
    //   console.log('doneeee')
    // },error =>{
    //   this.error = error.error.detail;
    // })
    console.log(event,'lllllllllll')
  }
}
