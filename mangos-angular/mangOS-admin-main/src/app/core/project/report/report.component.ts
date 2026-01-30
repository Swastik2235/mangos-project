import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss']
})
export class ReportComponent {
	/** Based on the screen size, switch from standard to one column per row */
	cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(({ matches }) => {
			if (matches) {
				return [
					{ title: 'Section Data', cols: 1, rows: 1 },
					{ title: 'Card 2', cols: 1, rows: 1 },
					{ title: 'Production Chart', cols: 1, rows: 1 },
					{ title: 'Packaging', cols: 1, rows: 1 }
				];
			}
			return [
				{ title: 'Section Data', cols: 2, rows: 2 },
				{ title: 'Job Card', cols: 1, rows: 1 },
				{ title: 'Production Chart', cols: 1, rows: 2 },
				{ title: 'Packaging', cols: 1, rows: 1 }
			];
		})
	);

	Fabrication=0.0;
	Cutting=0.0;
	Gal=0.0;
	Dispatch=0.0;
	
	// Production Chart--------->
	pieChartOptions:any = {   
		chart : {
			plotBorderWidth: null,
			plotShadow: false,
			height:500,
			width:450,
		},
		title : {
			text: ''   
		},
		tooltip : {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions : {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
					style: {
						color: ('green')||
						'black'
					}
				}
			}
		},
		series : []
	};
// Job Card----------->
	jobCardOptions:any = {   
		chart : {
			plotBorderWidth: null,
			plotShadow: false,
			height:200,
			width:450,
		},
		title : {
			text: ''   
		},
		tooltip : {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions : {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
					style: {
						color: ('green')||
						'black'
					}
				}
			}
		},
		series : []
	};

// packaging--------->
	packagingOptions:any = {   
		chart : {
			plotBorderWidth: null,
			plotShadow: false,
			height:200,
			width:450,
		},
		title : {
			text: ''   
		},
		tooltip : {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions : {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
					style: {
						color: ('green')||
						'black'
					}
				}
			}
		},
		series : []
	};

	// --Section Data-chart---->
	columnChatOtpions:any = {   
		chart: {
			type: 'column',
			height:500,
			width:900,
		},
		title: {
			text: ''
		},
		xAxis:{categories: [],},     
		yAxis : {
			title: {
				text: 'Quantity'         
			}      
		},
		tooltip : {
			headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
				'<td style = "padding:0"><b>{point.y:.1f} </b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
		},
		plotOptions : {
			column: {
			//   pointPadding: 0.2,
			//   borderWidth: 0
			}
		},
		series: [{
				name: 'Total Order',
				data: []
			}, 
			{
				name: 'Total Quantity',
				data: []
			},
		]
	};

	projectList:any=[];
	

	sectionList:any=[];
	itemList:any=[];
	bomList:any=[];
	job_item:any;
	dispatch_item:any;
	selectedProject = new FormControl();
	projectSlug:any;
	constructor(private breakpointObserver: BreakpointObserver,private auth : AuthenticationService,private spinner: NgxSpinnerService,private _route:ActivatedRoute,private router:Router) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
		this.spinner.show()
		this.projectSlug = this._route.snapshot.paramMap.get('id')
		this.loadProject()
	}

	loadProject(){
		this.auth.getAPI('project/').subscribe(res=>{
			this.projectList = res.results
			if(this.projectSlug==null){
				this.projectSlug= this.projectList[0].id
				this.selectedProject.setValue(this.projectSlug);
				this.chartDataLoad()
			}else{
				this.selectedProject.setValue(parseInt(this.projectSlug));
				this.chartDataLoad()
			}
			this.spinner.hide()
		})
	}
	
	changeProject(data:any){
		this.router.navigate(['/project/report/'+data])
		this.selectedProject.setValue(data);
	}


	chartDataLoad(){
		
		this.auth.getAPI('section/?project='+this.projectSlug).subscribe(res=>{
			const data = res.results
			for(let i=0;i<data.length;i++){
				this.Fabrication += data[i].total.fabrication
				this.Cutting += data[i].total.fabrication
				this.Gal += data[i].total.galvanizing
				this.Dispatch += data[i].total.dispatch
				this.sectionList.push(data[i].title)
				this.itemList.push(data[i].total.job_item)
				this.bomList.push(data[i].total.bom)
				// console.log(data[i].total.job_item)
		}
		// Pie Chart Data
		this.auth.getAPI('project-report/?project='+this.projectSlug).subscribe(res=>{
			this.job_item = parseFloat(res.results.job_item)*100
			this.dispatch_item = parseFloat(res.results.dispatch_item)*100
			this.jobCardOptions.series = [{ type:'pie' ,name: 'Browser share', data: [['Complete' , this.job_item],['Remaining' , (100-this.job_item)]]}]
			this.packagingOptions.series = [{ type:'pie' ,name: 'Browser share', data: [['Complete' , this.dispatch_item],['Remaining' , (100-this.dispatch_item)]]}]
			
			Highcharts.chart('jobCardContainer',this.jobCardOptions)
			Highcharts.chart('packagingContainer',this.packagingOptions)
			this.spinner.hide()
		})
		
		

		this.pieChartOptions.series = [{type: 'pie',name: 'Browser share',data: [['Fabrication', this.Fabrication],['Cutting', this.Cutting],{name: 'Dispatch',y: this.Dispatch,sliced: true,selected: true},['Galvanizing', this.Gal],]}]
		Highcharts.chart('pieChartContainer',this.pieChartOptions)

		// Column Chart Data
		this.columnChatOtpions.series = [{name:'BOM',data:this.bomList},{name:'Items',data:this.itemList}]
		this.columnChatOtpions.xAxis.categories = this.sectionList
		Highcharts.chart('columnChartContainer', this.columnChatOtpions )
		
		})
	}
	
}
