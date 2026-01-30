import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import sunburst from 'highcharts/modules/sunburst.js';
sunburst(Highcharts);
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';
import { ConfirmComponent } from 'src/app/shared/dialogs/default/confirm/confirm.component';
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsWindbarb from "highcharts/modules/windbarb";
import highcharts3D from 'highcharts/highcharts-3d';
import HC_more from 'highcharts/highcharts-more';
HighchartsSankey(Highcharts);
HighchartsWindbarb(Highcharts);
highcharts3D(Highcharts);
HC_more(Highcharts);


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
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
  	encapsulation:ViewEncapsulation.None
})
export class DashboardComponent {
	/** Based on the screen size, switch from standard to one column per row */

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	tableData:InviteItem[]=[];
	dataSource = new MatTableDataSource<InviteItem>(this.tableData);
	displayedColumns = ['id', 'company', 'user', 'email', 'role', 'status','action'];

	cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(({ matches }) => {
			if (matches) {
				return [
					{ title: 'Operating System', cols: 1, rows: 1 },
					{ title: 'Card 1', cols: 1, rows: 1 },
					{ title: 'Card 2', cols: 1, rows: 1 },
					{ title: 'Card 3', cols: 1, rows: 1 },
					{ title: 'Card 4', cols: 1, rows: 1 },
					{ title: 'Card 5', cols: 1, rows: 1 },
					{ title: 'Card 6', cols: 1, rows: 1 },
					{ title: 'Card 7', cols: 1, rows: 1 },
					{ title: 'Card 8', cols: 1, rows: 1 },
					{ title: 'Card 9', cols: 1, rows: 1 },
					{ title: 'Card 10', cols: 1, rows: 1 },
					// { title: 'Card 11', cols: 1, rows: 1 },
				];
			}

			return [
				{ title: 'Operating System', cols: 2, rows: 2 },
				{ title: 'Card 1', cols: 2, rows: 1 },
				{ title: 'Card 2', cols: 1, rows: 1 },
				{ title: 'Card 3', cols: 1, rows: 2 },
				{ title: 'Card 4', cols: 1, rows: 1 },
				{ title: 'Card 5', cols: 2, rows: 1 },
				{ title: 'Card 6', cols: 2, rows: 1 },
				{ title: 'Card 7', cols: 2, rows: 1 },
				{ title: 'Card 8', cols: 2, rows: 1 },
				{ title: 'Card 9', cols: 2, rows: 1 },
				{ title: 'Card 10', cols: 2, rows: 2 },
				// { title: 'Card 11', cols: 2, rows: 1 },
			];
		})
	);
	

	
	apiDate:any = [];
	purchaseData :any=[];
	saleData : any =[];
	loginUser:any;
	operational_service:any = [];

	chartOption_5:any = {
		chart: {
	        height: '80%'
	    },

	    // Let the center circle be transparent
	    // colors: ['transparent'].concat(Highcharts.getOptions().colors),

	    title: {
	        text: 'Operational Services'
	    },

	    // subtitle: {
	    //     text: 'Source <a href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
	    // },

	    series: [{
	        type: 'sunburst',
	        data: [],
	        name: 'Root',
	        allowDrillToNode: true,
	        cursor: 'pointer',
	        dataLabels: {
	            format: '{point.name}',
	            filter: {
	                property: 'innerArcLength',
	                operator: '>',
	                value: 16
	            },
	            rotationMode: 'circular'
	        },
	        levels: [{
	            level: 1,
	            levelIsConstant: false,
	            dataLabels: {
	                filter: {
	                    property: 'outerArcLength',
	                    operator: '>',
	                    value: 64
	                }
	            }
	        }, {
	            level: 2,
	            colorByPoint: true
	        },
	        {
	            level: 3,
	            colorVariation: {
	                key: 'brightness',
	                to: -0.5
	            }
	        }, {
	            level: 4,
	            colorVariation: {
	                key: 'brightness',
	                to: 0.5
	            }
	        }]

	    }],

	    tooltip: {
	        headerFormat: '',
	        pointFormat: '<b>ERA Operational Services</b>'
	    }
	};
	constructor(public dialog: MatDialog, private _snackBar:MatSnackBar, private breakpointObserver: BreakpointObserver,private router : Router,private auth : AuthenticationService,private spinner: NgxSpinnerService) {
		let token = localStorage.getItem('token');
		this.loginUser = this.auth.profile();
		if('email' in this.loginUser){
			this.auth.getAPI('invite/?email='+this.loginUser['email']).subscribe(result=>{
      			this.dataSource.data = result['results'];
			})
		}
		this.spinner.show();
		if(token === null){
			this.router.navigate(['login']);
		}else{
			this.auth.getAPI('dashboard/').subscribe(response=>{
				console.log(response['results']['operation_service'],'11111111111')
				this.operational_service = response['results']['operation_service'];
				for(let i = 0; i < response.results['purchase'].length;i++){
					this.apiDate.push(Object.keys(response.results['purchase'][i]).toString())
					this.saleData.push(parseInt(Object.values(response.results['sale'][i]).toString()))
					this.purchaseData.push(parseInt(Object.values(response.results['purchase'][i]).toString()))
				}
				this.chartOption_5.series[0].data = this.operational_service
				Highcharts.chart('container',this.chartOption_1);
				Highcharts.chart('container-2',this.chartOption_2);
				Highcharts.chart('container-3',this.chartOption_3);
				Highcharts.chart('container-4',this.chartOption_4);
				Highcharts.chart('container-6',this.chartOption_6);
				Highcharts.chart('container-7',this.chartOption_7);
				Highcharts.chart('container-8',this.chartOption_8);
				Highcharts.chart('container-9',this.chartOption_9);
				Highcharts.chart('container-10',this.chartOption_10);
				Highcharts.chart('container-11',this.chartOption_11);
				Highcharts.chart('container-5',this.chartOption_5);

					this.spinner.hide()
				})
			}
			
		}
		chartOption_6:any = {

			title: {
				text: 'Material Flow operations wise from Department'
			},
			accessibility: {
				point: {
					valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
				}
			},
			series: [{
				keys: ['from', 'to', 'weight'],
				data: [
					['Brazil', 'Portugal', 5],
					['Brazil', 'France', 1],
					['Brazil', 'Spain', 1],
					['Brazil', 'England', 1],
					['Canada', 'Portugal', 1],
					['Canada', 'France', 5],
					['Canada', 'England', 1],
					['Mexico', 'Portugal', 1],
					['Mexico', 'France', 1],
					['Mexico', 'Spain', 5],
					['Mexico', 'England', 1],
					['USA', 'Portugal', 1],
					['USA', 'France', 1],
					['USA', 'Spain', 1],
					['USA', 'England', 5],
					['Portugal', 'Angola', 2],
					['Portugal', 'Senegal', 1],
					['Portugal', 'Morocco', 1],
					['Portugal', 'South Africa', 3],
					['France', 'Angola', 1],
					['France', 'Senegal', 3],
					['France', 'Mali', 3],
					['France', 'Morocco', 3],
					['France', 'South Africa', 1],
					['Spain', 'Senegal', 1],
					['Spain', 'Morocco', 3],
					['Spain', 'South Africa', 1],
					['England', 'Angola', 1],
					['England', 'Senegal', 1],
					['England', 'Morocco', 2],
					['England', 'South Africa', 7],
					['South Africa', 'China', 5],
					['South Africa', 'India', 1],
					['South Africa', 'Japan', 3],
					['Angola', 'China', 5],
					['Angola', 'India', 1],
					['Angola', 'Japan', 3],
					['Senegal', 'China', 5],
					['Senegal', 'India', 1],
					['Senegal', 'Japan', 3],
					['Mali', 'China', 5],
					['Mali', 'India', 1],
					['Mali', 'Japan', 3],
					['Morocco', 'China', 5],
					['Morocco', 'India', 1],
					['Morocco', 'Japan', 3]
				],
				type: 'sankey',
				name: 'Sankey demo series'
			}]
		
		};
		chartOption_7:any = {
			chart: {         
				type: 'scatter',
				marginBottom: 100,
				marginRight: 50,
				options3d: {
				   enabled: true,
				   alpha: 10,
				   beta: 30,
				   depth: 250,
				   viewDistance: 5,
				   frame:{
					  bottom :{
						 size: 1,
						 color: 'rgba(0, 0, 0, 0.02)'
					  },
					  back :{
						 size: 1,
						 color: 'rgba(0, 0, 0, 0.04)'
					  },
					  side :{
						 size: 1,
						 color: 'rgba(0, 0, 0, 0.06)'
					  }
				   }
				}
			 },         
			 title : {
				text: 'Material + Machinery + Manpower integrated dimensions' 
			 },
			 xAxis:{
				min:0,
				max:10        
			 }, 
			 yAxis:{
				min:0,
				max:10        
			 },
			 zAxis:{
				min:0,
				ax:10        
			 },
			 series : [{
				name: 'Reading',
				data: [  
				   [1, 6, 5], [8, 7, 9], [1, 3, 4], [4, 6, 8], [5, 7, 7], [6, 9, 6],  
				   [7, 0, 5], [2, 3, 3], [3, 9, 8], [3, 6, 5], [4, 9, 4], [2, 3, 3],  
				   [6, 9, 9], [0, 7, 0], [7, 7, 9], [7, 2, 9], [0, 6, 2], [4, 6, 7],  
				   [3, 7, 7], [0, 1, 7], [2, 8, 6], [2, 3, 7], [6, 4, 8], [3, 5, 9],  
				   [7, 9, 5], [3, 1, 7], [4, 4, 2], [3, 6, 2], [3, 1, 6], [6, 8, 5],  
				   [6, 6, 7], [4, 1, 1], [7, 2, 7], [7, 7, 0], [8, 8, 9], [9, 4, 1],  
				   [8, 3, 4], [9, 8, 9], [3, 5, 3], [0, 2, 4], [6, 0, 2], [2, 1, 3],  
				   [5, 8, 9], [2, 1, 1], [9, 7, 6], [3, 0, 2], [9, 9, 0], [3, 4, 8],  
				   [2, 6, 1], [8, 9, 2], [7, 6, 5], [6, 3, 1], [9, 3, 1], [8, 9, 3],  
				   [9, 1, 0], [3, 8, 7], [8, 0, 0], [4, 9, 7], [8, 6, 2], [4, 3, 0],  
				   [2, 3, 5], [9, 1, 4], [1, 1, 4], [6, 0, 2], [6, 1, 6], [3, 8, 8],  
				   [8, 8, 7], [5, 5, 0], [3, 9, 6], [5, 4, 3], [6, 8, 3], [0, 1, 5],  
				   [6, 7, 3], [8, 3, 2], [3, 8, 3], [2, 1, 6], [4, 6, 7], [8, 9, 9],  
				   [5, 4, 2], [6, 1, 3], [6, 9, 5], [4, 8, 2], [9, 7, 4], [5, 4, 2],  
				   [9, 6, 1], [2, 7, 3], [4, 5, 4], [6, 8, 1], [3, 4, 0], [2, 2, 6],  
				   [5, 1, 2], [9, 9, 7], [6, 9, 9], [8, 4, 3], [4, 1, 7], [6, 2, 5],  
				   [0, 4, 9], [3, 5, 9], [6, 9, 1], [1, 9, 2]  
				]
			 }]
		};
		chartOption_8:any = {
			chart : {
				type: 'spline',
				marginRight: 10,
				events: {
				   load: function () {
					  // set up the updating of the chart each second
					  setInterval(function () {
						 var x = (new Date()).getTime(), // current time
						 y = Math.random();
					  }, 1000);
				   }
				}
			 },
			 title : {
				text: 'VSM'   
			 },   
			 xAxis : {
				type: 'datetime',
				tickPixelInterval: 150
			 },
			 yAxis : {
				title: {
				   text: 'Value'
				},
				plotLines: [{
				   value: 0,
				   width: 1,
				   color: '#808080'
				}]
			 },

			 plotOptions: {
				area: {
				   pointStart: 1940,
				   marker: {
					  enabled: false,
					  symbol: 'circle',
					  radius: 2,
					  states: {
						 hover: {
							enabled: true
						 }
					  }
				   }
				}
			 },
			 legend: {
				enabled: false
			 },
			 exporting : {
				enabled: false
			 },
			 series : [{
				name: 'Random data',
				data: (function () {
				   // generate an array of random data
				   var data = [],time = (new Date()).getTime(),i;
				   for (i = -19; i <= 0; i += 1) {
					  data.push({
						 x: time + i * 1000,
						 y: Math.random()
					  });
				   }
				   return data;
				}())    
			 }]
		};
		chartOption_9:any = {
			title: {
				text: 'Rates'
			},
		
			xAxis: {
				type: 'datetime',
				offset: 40
			},
		
			plotOptions: {
				series: {
					pointStart: Date.UTC(2017, 0, 29),
					pointInterval: 36e5
				}
			},
		
			series: [{
				type: 'windbarb',
				data: [
					[9.8, 177.9],
					[10.1, 177.2],
					[11.3, 179.7],
					[10.9, 175.5],
					[9.3, 159.9],
					[8.8, 159.6],
					[7.8, 162.6],
					[5.6, 186.2],
					[6.8, 146.0],
					[6.4, 139.9],
					[3.1, 180.2],
					[4.3, 177.6],
					[5.3, 191.8],
					[6.3, 173.1],
					[7.7, 140.2],
					[8.5, 136.1],
					[9.4, 142.9],
					[10.0, 140.4],
					[5.3, 142.1],
					[3.8, 141.0],
					[3.3, 116.5],
					[1.5, 327.5],
					[0.1, 1.1],
					[1.2, 11.1]
				],
				name: 'Wind',
				showInLegend: false,
				tooltip: {
					valueSuffix: ' m/s'
				}
			}, {
				type: 'area',
				keys: ['y', 'rotation'], // rotation is not used here
				data: [
					[9.8, 177.9],
					[10.1, 177.2],
					[11.3, 179.7],
					[10.9, 175.5],
					[9.3, 159.9],
					[8.8, 159.6],
					[7.8, 162.6],
					[5.6, 186.2],
					[6.8, 146.0],
					[6.4, 139.9],
					[3.1, 180.2],
					[4.3, 177.6],
					[5.3, 191.8],
					[6.3, 173.1],
					[7.7, 140.2],
					[8.5, 136.1],
					[9.4, 142.9],
					[10.0, 140.4],
					[5.3, 142.1],
					[3.8, 141.0],
					[3.3, 116.5],
					[1.5, 327.5],
					[0.1, 1.1],
					[1.2, 11.1]
				],
				name: 'Wind speed',
				tooltip: {
					valueSuffix: ' m/s'
				},
				states: {
					inactive: {
						opacity: 1
					}
				}
			}]
		
		};
		chartOption_10:any = { chart: {
			type: 'waterfall'
		},
	
		title: {
			text: 'Inventory'
		},
	
		xAxis: {
			type: 'category'
		},
	
		yAxis: {
			title: {
				text: 'USD'
			}
		},
	
		legend: {
			enabled: false
		},
	
		tooltip: {
			pointFormat: '<b>${point.y:,.2f}</b> USD'
		},
	
		series: [{
			data: [{
				name: 'Start',
				y: 120000
			}, {
				name: 'Product Revenue',
				y: 569000
			}, {
				name: 'Service Revenue',
				y: 231000
			}, {
				name: 'Positive Balance',
				isIntermediateSum: true,
			}, {
				name: 'Fixed Costs',
				y: -342000
			}, {
				name: 'Variable Costs',
				y: -233000
			}, {
				name: 'Balance',
				isSum: true,
			}],
			dataLabels: {
				enabled: true,
				style: {
					fontWeight: 'bold'
				}
			},
			pointPadding: 0
		}]};

		chartOption_11:any = {chart: {
			type: 'packedbubble',
			height: '90%'
		},
		title: {
			text: 'Operations - Sales '
		},
		tooltip: {
			useHTML: true,
			pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
		},
		plotOptions: {
			packedbubble: {
				minSize: '30%',
				maxSize: '100%',
				zMin: 0,
				zMax: 1000,
				layoutAlgorithm: {
					splitSeries: false,
					gravitationalConstant: 0.02
				},
				dataLabels: {
					enabled: true,
					format: '{point.name}',
					filter: {
						property: 'y',
						operator: '>',
						value: 250
					},
					style: {
						color: 'black',
						textOutline: 'none',
						fontWeight: 'normal'
					}
				}
			}
		},
		series: [{
			name: 'Europe',
			data: [{
				name: 'Germany',
				value: 767.1
			}, {
				name: 'Croatia',
				value: 20.7
			},
			{
				name: "Belgium",
				value: 97.2
			},
			{
				name: "Czech Republic",
				value: 111.7
			},
			{
				name: "Netherlands",
				value: 158.1
			},
			{
				name: "Spain",
				value: 241.6
			},
			{
				name: "Ukraine",
				value: 249.1
			},
			{
				name: "Poland",
				value: 298.1
			},
			{
				name: "France",
				value: 323.7
			},
			{
				name: "Romania",
				value: 78.3
			},
			{
				name: "United Kingdom",
				value: 415.4
			}, {
				name: "Turkey",
				value: 353.2
			}, {
				name: "Italy",
				value: 337.6
			},
			{
				name: "Greece",
				value: 71.1
			},
			{
				name: "Austria",
				value: 69.8
			},
			{
				name: "Belarus",
				value: 67.7
			},
			{
				name: "Serbia",
				value: 59.3
			},
			{
				name: "Finland",
				value: 54.8
			},
			{
				name: "Bulgaria",
				value: 51.2
			},
			{
				name: "Portugal",
				value: 48.3
			},
			{
				name: "Norway",
				value: 44.4
			},
			{
				name: "Sweden",
				value: 44.3
			},
			{
				name: "Hungary",
				value: 43.7
			},
			{
				name: "Switzerland",
				value: 40.2
			},
			{
				name: "Denmark",
				value: 40
			},
			{
				name: "Slovakia",
				value: 34.7
			},
			{
				name: "Ireland",
				value: 34.6
			},
			{
				name: "Croatia",
				value: 20.7
			},
			{
				name: "Estonia",
				value: 19.4
			},
			{
				name: "Slovenia",
				value: 16.7
			},
			{
				name: "Lithuania",
				value: 12.3
			},
			{
				name: "Luxembourg",
				value: 10.4
			},
			{
				name: "Macedonia",
				value: 9.5
			},
			{
				name: "Moldova",
				value: 7.8
			},
			{
				name: "Latvia",
				value: 7.5
			},
			{
				name: "Cyprus",
				value: 7.2
			}]
		}, {
			name: 'Africa',
			data: [{
				name: "Senegal",
				value: 8.2
			},
			{
				name: "Cameroon",
				value: 9.2
			},
			{
				name: "Zimbabwe",
				value: 13.1
			},
			{
				name: "Ghana",
				value: 14.1
			},
			{
				name: "Kenya",
				value: 14.1
			},
			{
				name: "Sudan",
				value: 17.3
			},
			{
				name: "Tunisia",
				value: 24.3
			},
			{
				name: "Angola",
				value: 25
			},
			{
				name: "Libya",
				value: 50.6
			},
			{
				name: "Ivory Coast",
				value: 7.3
			},
			{
				name: "Morocco",
				value: 60.7
			},
			{
				name: "Ethiopia",
				value: 8.9
			},
			{
				name: "United Republic of Tanzania",
				value: 9.1
			},
			{
				name: "Nigeria",
				value: 93.9
			},
			{
				name: "South Africa",
				value: 392.7
			}, {
				name: "Egypt",
				value: 225.1
			}, {
				name: "Algeria",
				value: 141.5
			}]
		}, {
			name: 'Oceania',
			data: [{
				name: "Australia",
				value: 409.4
			},
			{
				name: "New Zealand",
				value: 34.1
			},
			{
				name: "Papua New Guinea",
				value: 7.1
			}]
		}, {
			name: 'North America',
			data: [{
				name: "Costa Rica",
				value: 7.6
			},
			{
				name: "Honduras",
				value: 8.4
			},
			{
				name: "Jamaica",
				value: 8.3
			},
			{
				name: "Panama",
				value: 10.2
			},
			{
				name: "Guatemala",
				value: 12
			},
			{
				name: "Dominican Republic",
				value: 23.4
			},
			{
				name: "Cuba",
				value: 30.2
			},
			{
				name: "USA",
				value: 5334.5
			}, {
				name: "Canada",
				value: 566
			}, {
				name: "Mexico",
				value: 456.3
			}]
		}, {
			name: 'South America',
			data: [{
				name: "El Salvador",
				value: 7.2
			},
			{
				name: "Uruguay",
				value: 8.1
			},
			{
				name: "Bolivia",
				value: 17.8
			},
			{
				name: "Trinidad and Tobago",
				value: 34
			},
			{
				name: "Ecuador",
				value: 43
			},
			{
				name: "Chile",
				value: 78.6
			},
			{
				name: "Peru",
				value: 52
			},
			{
				name: "Colombia",
				value: 74.1
			},
			{
				name: "Brazil",
				value: 501.1
			}, {
				name: "Argentina",
				value: 199
			},
			{
				name: "Venezuela",
				value: 195.2
			}]
		}, {
			name: 'Asia',
			data: [{
				name: "Nepal",
				value: 6.5
			},
			{
				name: "Georgia",
				value: 6.5
			},
			{
				name: "Brunei Darussalam",
				value: 7.4
			},
			{
				name: "Kyrgyzstan",
				value: 7.4
			},
			{
				name: "Afghanistan",
				value: 7.9
			},
			{
				name: "Myanmar",
				value: 9.1
			},
			{
				name: "Mongolia",
				value: 14.7
			},
			{
				name: "Sri Lanka",
				value: 16.6
			},
			{
				name: "Bahrain",
				value: 20.5
			},
			{
				name: "Yemen",
				value: 22.6
			},
			{
				name: "Jordan",
				value: 22.3
			},
			{
				name: "Lebanon",
				value: 21.1
			},
			{
				name: "Azerbaijan",
				value: 31.7
			},
			{
				name: "Singapore",
				value: 47.8
			},
			{
				name: "Hong Kong",
				value: 49.9
			},
			{
				name: "Syria",
				value: 52.7
			},
			{
				name: "DPR Korea",
				value: 59.9
			},
			{
				name: "Israel",
				value: 64.8
			},
			{
				name: "Turkmenistan",
				value: 70.6
			},
			{
				name: "Oman",
				value: 74.3
			},
			{
				name: "Qatar",
				value: 88.8
			},
			{
				name: "Philippines",
				value: 96.9
			},
			{
				name: "Kuwait",
				value: 98.6
			},
			{
				name: "Uzbekistan",
				value: 122.6
			},
			{
				name: "Iraq",
				value: 139.9
			},
			{
				name: "Pakistan",
				value: 158.1
			},
			{
				name: "Vietnam",
				value: 190.2
			},
			{
				name: "United Arab Emirates",
				value: 201.1
			},
			{
				name: "Malaysia",
				value: 227.5
			},
			{
				name: "Kazakhstan",
				value: 236.2
			},
			{
				name: "Thailand",
				value: 272
			},
			{
				name: "Taiwan",
				value: 276.7
			},
			{
				name: "Indonesia",
				value: 453
			},
			{
				name: "Saudi Arabia",
				value: 494.8
			},
			{
				name: "Japan",
				value: 1278.9
			},
			{
				name: "China",
				value: 10540.8
			},
			{
				name: "India",
				value: 2341.9
			},
			{
				name: "Russia",
				value: 1766.4
			},
			{
				name: "Iran",
				value: 618.2
			},
			{
				name: "Korea",
				value: 610.1
			}]
		}]};

	// data5 = [{
	// 	    id: '0.0',
	// 	    parent: '',
	// 	    name: 'ERA'
	// 	}, {
	// 	    id: '1.3',
	// 	    parent: '0.0',
	// 	    name: 'Fab + Galva'
	// 	}, {
	// 	    id: '1.1',
	// 	    parent: '0.0',
	// 	    name: 'Fab'
	// 	}, {
	// 	    id: '1.2',
	// 	    parent: '0.0',
	// 	    name: 'Galva'
	// 	}, {
	// 	    id: '1.4',
	// 	    parent: '0.0',
	// 	    name: 'Solar'
	// 	}, {
	// 	    id: '1.5',
	// 	    parent: '0.0',
	// 	    name: 'Oceanic'
	// 	},

	// 	/* Africa */
	// 	{
	// 	    id: '2.1',
	// 	    parent: '1.1',
	// 	    name: 'TATA'
	// 	},

	// 	{
	// 	    id: '3.1',
	// 	    parent: '2.1',
	// 	    name: 'Ethiopia',
	// 	    value: 104957438
	// 	}, {
	// 	    id: '3.2',
	// 	    parent: '2.1',
	// 	    name: 'Tanzania',
	// 	    value: 57310019
	// 	}, {
	// 	    id: '3.3',
	// 	    parent: '2.1',
	// 	    name: 'Kenya',
	// 	    value: 49699862
	// 	}, {
	// 	    id: '3.4',
	// 	    parent: '2.1',
	// 	    name: 'Uganda',
	// 	    value: 42862958
	// 	}, {
	// 	    id: '3.5',
	// 	    parent: '2.1',
	// 	    name: 'Mozambique',
	// 	    value: 29668834
	// 	}, {
	// 	    id: '3.6',
	// 	    parent: '2.1',
	// 	    name: 'Madagascar',
	// 	    value: 25570895
	// 	}, {
	// 	    id: '3.7',
	// 	    parent: '2.1',
	// 	    name: 'Malawi',
	// 	    value: 18622104
	// 	}, {
	// 	    id: '3.8',
	// 	    parent: '2.1',
	// 	    name: 'Zambia',
	// 	    value: 17094130
	// 	}, {
	// 	    id: '3.9',
	// 	    parent: '2.1',
	// 	    name: 'Zimbabwe',
	// 	    value: 16529904
	// 	}, {
	// 	    id: '3.10',
	// 	    parent: '2.1',
	// 	    name: 'Somalia',
	// 	    value: 14742523
	// 	}, {
	// 	    id: '3.11',
	// 	    parent: '2.1',
	// 	    name: 'South Sudan',
	// 	    value: 12575714
	// 	}, {
	// 	    id: '3.12',
	// 	    parent: '2.1',
	// 	    name: 'Rwanda',
	// 	    value: 12208407
	// 	}, {
	// 	    id: '3.13',
	// 	    parent: '2.1',
	// 	    name: 'Burundi',
	// 	    value: 10864245
	// 	}, {
	// 	    id: '3.14',
	// 	    parent: '2.1',
	// 	    name: 'Eritrea',
	// 	    value: 5068831
	// 	}, {
	// 	    id: '3.15',
	// 	    parent: '2.1',
	// 	    name: 'Mauritius',
	// 	    value: 1265138
	// 	}, {
	// 	    id: '3.16',
	// 	    parent: '2.1',
	// 	    name: 'Djibouti',
	// 	    value: 956985
	// 	}, {
	// 	    id: '3.17',
	// 	    parent: '2.1',
	// 	    name: 'Réunion',
	// 	    value: 876562
	// 	}, {
	// 	    id: '3.18',
	// 	    parent: '2.1',
	// 	    name: 'Comoros',
	// 	    value: 813912
	// 	}, {
	// 	    id: '3.19',
	// 	    parent: '2.1',
	// 	    name: 'Mayotte',
	// 	    value: 253045
	// 	}, {
	// 	    id: '3.20',
	// 	    parent: '2.1',
	// 	    name: 'Seychelles',
	// 	    value: 94737
	// 	},

	// 	{
	// 	    id: '2.5',
	// 	    parent: '1.1',
	// 	    name: 'SEGNOTECH'
	// 	},

	// 	{
	// 	    id: '3.42',
	// 	    parent: '2.5',
	// 	    name: 'Nigeria',
	// 	    value: 190886311
	// 	}, {
	// 	    id: '3.43',
	// 	    parent: '2.5',
	// 	    name: 'Ghana',
	// 	    value: 28833629
	// 	}, {
	// 	    id: '3.44',
	// 	    parent: '2.5',
	// 	    name: 'Côte Ivoire',
	// 	    value: 24294750
	// 	}, {
	// 	    id: '3.45',
	// 	    parent: '2.5',
	// 	    name: 'Niger',
	// 	    value: 21477348
	// 	}, {
	// 	    id: '3.46',
	// 	    parent: '2.5',
	// 	    name: 'Burkina Faso',
	// 	    value: 19193382
	// 	}, {
	// 	    id: '3.47',
	// 	    parent: '2.5',
	// 	    name: 'Mali',
	// 	    value: 18541980
	// 	}, {
	// 	    id: '3.48',
	// 	    parent: '2.5',
	// 	    name: 'Senegal',
	// 	    value: 15850567
	// 	}, {
	// 	    id: '3.49',
	// 	    parent: '2.5',
	// 	    name: 'Guinea',
	// 	    value: 12717176
	// 	}, {
	// 	    id: '3.50',
	// 	    parent: '2.5',
	// 	    name: 'Benin',
	// 	    value: 11175692
	// 	}, {
	// 	    id: '3.51',
	// 	    parent: '2.5',
	// 	    name: 'Togo',
	// 	    value: 7797694
	// 	}, {
	// 	    id: '3.52',
	// 	    parent: '2.5',
	// 	    name: 'Sierra Leone',
	// 	    value: 7557212
	// 	}, {
	// 	    id: '3.53',
	// 	    parent: '2.5',
	// 	    name: 'Liberia',
	// 	    value: 4731906
	// 	}, {
	// 	    id: '3.54',
	// 	    parent: '2.5',
	// 	    name: 'Mauritania',
	// 	    value: 4420184
	// 	}, {
	// 	    id: '3.55',
	// 	    parent: '2.5',
	// 	    name: 'The Gambia',
	// 	    value: 2100568
	// 	}, {
	// 	    id: '3.56',
	// 	    parent: '2.5',
	// 	    name: 'Guinea-Bissau',
	// 	    value: 1861283
	// 	}, {
	// 	    id: '3.57',
	// 	    parent: '2.5',
	// 	    name: 'Cabo Verde',
	// 	    value: 546388
	// 	}, {
	// 	    id: '3.58',
	// 	    parent: '2.5',
	// 	    name: 'Saint Helena, Ascension and Tristan da Cunha',
	// 	    value: 4049
	// 	},

	// 	{
	// 	    id: '2.3',
	// 	    parent: '1.1',
	// 	    name: 'ADANI'
	// 	},

	// 	{
	// 	    id: '3.30',
	// 	    parent: '2.3',
	// 	    name: 'Egypt',
	// 	    value: 97553151
	// 	}, {
	// 	    id: '3.31',
	// 	    parent: '2.3',
	// 	    name: 'Algeria',
	// 	    value: 41318142
	// 	}, {
	// 	    id: '3.32',
	// 	    parent: '2.3',
	// 	    name: 'Sudan',
	// 	    value: 40533330
	// 	}, {
	// 	    id: '3.33',
	// 	    parent: '2.3',
	// 	    name: 'Morocco',
	// 	    value: 35739580
	// 	}, {
	// 	    id: '3.34',
	// 	    parent: '2.3',
	// 	    name: 'Tunisia',
	// 	    value: 11532127
	// 	}, {
	// 	    id: '3.35',
	// 	    parent: '2.3',
	// 	    name: 'Libya',
	// 	    value: 6374616
	// 	}, {
	// 	    id: '3.36',
	// 	    parent: '2.3',
	// 	    name: 'Western Sahara',
	// 	    value: 552628
	// 	},

	// 	{
	// 	    id: '2.2',
	// 	    parent: '1.1',
	// 	    name: 'Central Africa'
	// 	},

	// 	{
	// 	    id: '3.21',
	// 	    parent: '2.2',
	// 	    name: 'Democratic Republic of the Congo',
	// 	    value: 81339988
	// 	}, {
	// 	    id: '3.22',
	// 	    parent: '2.2',
	// 	    name: 'Angola',
	// 	    value: 29784193
	// 	}, {
	// 	    id: '3.23',
	// 	    parent: '2.2',
	// 	    name: 'Cameroon',
	// 	    value: 24053727
	// 	}, {
	// 	    id: '3.24',
	// 	    parent: '2.2',
	// 	    name: 'Chad',
	// 	    value: 14899994
	// 	}, {
	// 	    id: '3.25',
	// 	    parent: '2.2',
	// 	    name: 'Congo',
	// 	    value: 5260750
	// 	}, {
	// 	    id: '3.26',
	// 	    parent: '2.2',
	// 	    name: 'Central African Republic',
	// 	    value: 4659080
	// 	}, {
	// 	    id: '3.27',
	// 	    parent: '2.2',
	// 	    name: 'Gabon',
	// 	    value: 2025137
	// 	}, {
	// 	    id: '3.28',
	// 	    parent: '2.2',
	// 	    name: 'Equatorial Guinea',
	// 	    value: 1267689
	// 	}, {
	// 	    id: '3.29',
	// 	    parent: '2.2',
	// 	    name: 'Sao Tome and Principe',
	// 	    value: 204327
	// 	},

	// 	{
	// 	    id: '2.4',
	// 	    parent: '1.1',
	// 	    name: 'South America'
	// 	},

	// 	{
	// 	    id: '3.37',
	// 	    parent: '2.4',
	// 	    name: 'South Africa',
	// 	    value: 56717156
	// 	}, {
	// 	    id: '3.38',
	// 	    parent: '2.4',
	// 	    name: 'Namibia',
	// 	    value: 2533794
	// 	}, {
	// 	    id: '3.39',
	// 	    parent: '2.4',
	// 	    name: 'Botswana',
	// 	    value: 2291661
	// 	}, {
	// 	    id: '3.40',
	// 	    parent: '2.4',
	// 	    name: 'Lesotho',
	// 	    value: 2233339
	// 	}, {
	// 	    id: '3.41',
	// 	    parent: '2.4',
	// 	    name: 'Swaziland',
	// 	    value: 1367254
	// 	},

	// 	/***********/

	// 	/* America */
	// 	{
	// 	    id: '2.9',
	// 	    parent: '1.2',
	// 	    name: 'South America'
	// 	},

	// 	{
	// 	    id: '3.98',
	// 	    parent: '2.9',
	// 	    name: 'Brazil',
	// 	    value: 209288278
	// 	}, {
	// 	    id: '3.99',
	// 	    parent: '2.9',
	// 	    name: 'Colombia',
	// 	    value: 49065615
	// 	}, {
	// 	    id: '3.100',
	// 	    parent: '2.9',
	// 	    name: 'Argentina',
	// 	    value: 44271041
	// 	}, {
	// 	    id: '3.101',
	// 	    parent: '2.9',
	// 	    name: 'Peru',
	// 	    value: 32165485
	// 	}, {
	// 	    id: '3.102',
	// 	    parent: '2.9',
	// 	    name: 'Venezuela',
	// 	    value: 31977065
	// 	}, {
	// 	    id: '3.103',
	// 	    parent: '2.9',
	// 	    name: 'Chile',
	// 	    value: 18054726
	// 	}, {
	// 	    id: '3.104',
	// 	    parent: '2.9',
	// 	    name: 'Ecuador',
	// 	    value: 16624858
	// 	}, {
	// 	    id: '3.105',
	// 	    parent: '2.9',
	// 	    name: 'Bolivia',
	// 	    value: 11051600
	// 	}, {
	// 	    id: '3.106',
	// 	    parent: '2.9',
	// 	    name: 'Paraguay',
	// 	    value: 6811297
	// 	}, {
	// 	    id: '3.107',
	// 	    parent: '2.9',
	// 	    name: 'Uruguay',
	// 	    value: 3456750
	// 	}, {
	// 	    id: '3.108',
	// 	    parent: '2.9',
	// 	    name: 'Guyana',
	// 	    value: 777859
	// 	}, {
	// 	    id: '3.109',
	// 	    parent: '2.9',
	// 	    name: 'Suriname',
	// 	    value: 563402
	// 	}, {
	// 	    id: '3.110',
	// 	    parent: '2.9',
	// 	    name: 'French Guiana',
	// 	    value: 282731
	// 	}, {
	// 	    id: '3.111',
	// 	    parent: '2.9',
	// 	    name: 'Falkland Islands',
	// 	    value: 2910
	// 	},

	// 	{
	// 	    id: '2.8',
	// 	    parent: '1.2',
	// 	    name: 'Northern America'
	// 	},

	// 	{
	// 	    id: '3.93',
	// 	    parent: '2.8',
	// 	    name: 'United States',
	// 	    value: 324459463
	// 	}, {
	// 	    id: '3.94',
	// 	    parent: '2.8',
	// 	    name: 'Canada',
	// 	    value: 36624199
	// 	}, {
	// 	    id: '3.95',
	// 	    parent: '2.8',
	// 	    name: 'Bermuda',
	// 	    value: 61349
	// 	}, {
	// 	    id: '3.96',
	// 	    parent: '2.8',
	// 	    name: 'Greenland',
	// 	    value: 56480
	// 	}, {
	// 	    id: '3.97',
	// 	    parent: '2.8',
	// 	    name: 'Saint Pierre and Miquelon',
	// 	    value: 6320
	// 	},

	// 	{
	// 	    id: '2.7',
	// 	    parent: '1.2',
	// 	    name: 'Central America'
	// 	},

	// 	{
	// 	    id: '3.85',
	// 	    parent: '2.7',
	// 	    name: 'Mexico',
	// 	    value: 129163276
	// 	}, {
	// 	    id: '3.86',
	// 	    parent: '2.7',
	// 	    name: 'Guatemala',
	// 	    value: 16913503
	// 	}, {
	// 	    id: '3.87',
	// 	    parent: '2.7',
	// 	    name: 'Honduras',
	// 	    value: 9265067
	// 	}, {
	// 	    id: '3.88',
	// 	    parent: '2.7',
	// 	    name: 'El Salvador',
	// 	    value: 6377853
	// 	}, {
	// 	    id: '3.89',
	// 	    parent: '2.7',
	// 	    name: 'Nicaragua',
	// 	    value: 6217581
	// 	}, {
	// 	    id: '3.90',
	// 	    parent: '2.7',
	// 	    name: 'Costa Rica',
	// 	    value: 4905769
	// 	}, {
	// 	    id: '3.91',
	// 	    parent: '2.7',
	// 	    name: 'Panama',
	// 	    value: 4098587
	// 	}, {
	// 	    id: '3.92',
	// 	    parent: '2.7',
	// 	    name: 'Belize',
	// 	    value: 374681
	// 	},

	// 	{
	// 	    id: '2.6',
	// 	    parent: '1.2',
	// 	    name: 'Caribbean'
	// 	},

	// 	{
	// 	    id: '3.59',
	// 	    parent: '2.6',
	// 	    name: 'Cuba',
	// 	    value: 11484636
	// 	}, {
	// 	    id: '3.60',
	// 	    parent: '2.6',
	// 	    name: 'Haiti',
	// 	    value: 10981229
	// 	}, {
	// 	    id: '3.61',
	// 	    parent: '2.6',
	// 	    name: 'Dominican Republic',
	// 	    value: 10766998
	// 	}, {
	// 	    id: '3.62',
	// 	    parent: '2.6',
	// 	    name: 'Puerto Rico',
	// 	    value: 3663131
	// 	}, {
	// 	    id: '3.63',
	// 	    parent: '2.6',
	// 	    name: 'Jamaica',
	// 	    value: 2890299
	// 	}, {
	// 	    id: '3.64',
	// 	    parent: '2.6',
	// 	    name: 'Trinidad and Tobago',
	// 	    value: 1369125
	// 	}, {
	// 	    id: '3.65',
	// 	    parent: '2.6',
	// 	    name: 'Guadeloupe',
	// 	    value: 449568
	// 	}, {
	// 	    id: '3.66',
	// 	    parent: '2.6',
	// 	    name: 'Bahamas',
	// 	    value: 395361
	// 	}, {
	// 	    id: '3.67',
	// 	    parent: '2.6',
	// 	    name: 'Martinique',
	// 	    value: 384896
	// 	}, {
	// 	    id: '3.68',
	// 	    parent: '2.6',
	// 	    name: 'Barbados',
	// 	    value: 285719
	// 	}, {
	// 	    id: '3.69',
	// 	    parent: '2.6',
	// 	    name: 'Saint Lucia',
	// 	    value: 178844
	// 	}, {
	// 	    id: '3.70',
	// 	    parent: '2.6',
	// 	    name: 'Curaçao',
	// 	    value: 160539
	// 	}, {
	// 	    id: '3.71',
	// 	    parent: '2.6',
	// 	    name: 'Saint Vincent and the Grenadines',
	// 	    value: 109897
	// 	}, {
	// 	    id: '3.72',
	// 	    parent: '2.6',
	// 	    name: 'Grenada',
	// 	    value: 107825
	// 	}, {
	// 	    id: '3.73',
	// 	    parent: '2.6',
	// 	    name: 'Aruba',
	// 	    value: 105264
	// 	}, {
	// 	    id: '3.74',
	// 	    parent: '2.6',
	// 	    name: 'United States Virgin Islands',
	// 	    value: 104901
	// 	}, {
	// 	    id: '3.75',
	// 	    parent: '2.6',
	// 	    name: 'Antigua and Barbuda',
	// 	    value: 102012
	// 	}, {
	// 	    id: '3.76',
	// 	    parent: '2.6',
	// 	    name: 'Dominica',
	// 	    value: 73925
	// 	}, {
	// 	    id: '3.77',
	// 	    parent: '2.6',
	// 	    name: 'Cayman Islands',
	// 	    value: 61559
	// 	}, {
	// 	    id: '3.78',
	// 	    parent: '2.6',
	// 	    name: 'Saint Kitts and Nevis',
	// 	    value: 55345
	// 	}, {
	// 	    id: '3.79',
	// 	    parent: '2.6',
	// 	    name: 'Sint Maarten',
	// 	    value: 40120
	// 	}, {
	// 	    id: '3.80',
	// 	    parent: '2.6',
	// 	    name: 'Turks and Caicos Islands',
	// 	    value: 35446
	// 	}, {
	// 	    id: '3.81',
	// 	    parent: '2.6',
	// 	    name: 'British Virgin Islands',
	// 	    value: 31196
	// 	}, {
	// 	    id: '3.82',
	// 	    parent: '2.6',
	// 	    name: 'Caribbean Netherlands',
	// 	    value: 25398
	// 	}, {
	// 	    id: '3.83',
	// 	    parent: '2.6',
	// 	    name: 'Anguilla',
	// 	    value: 14909
	// 	}, {
	// 	    id: '3.84',
	// 	    parent: '2.6',
	// 	    name: 'Montserrat',
	// 	    value: 5177
	// 	},
	// 	/***********/

	// 	/* Asia */
	// 	{
	// 	    id: '2.13',
	// 	    parent: '1.3',
	// 	    name: 'BHEL'
	// 	},

	// 	{
	// 	    id: '3.136',
	// 	    parent: '2.13',
	// 	    name: 'India',
	// 	    value: 300
	// 	}, {
	// 	    id: '3.137',
	// 	    parent: '2.13',
	// 	    name: 'Pakistan',
	// 	    value: 197015955
	// 	}, {
	// 	    id: '3.138',
	// 	    parent: '2.13',
	// 	    name: 'Bangladesh',
	// 	    value: 164669751
	// 	}, {
	// 	    id: '3.139',
	// 	    parent: '2.13',
	// 	    name: 'Iran',
	// 	    value: 81162788
	// 	}, {
	// 	    id: '3.140',
	// 	    parent: '2.13',
	// 	    name: 'Afghanistan',
	// 	    value: 35530081
	// 	}, {
	// 	    id: '3.141',
	// 	    parent: '2.13',
	// 	    name: 'Nepal',
	// 	    value: 29304998
	// 	}, {
	// 	    id: '3.142',
	// 	    parent: '2.13',
	// 	    name: 'Sri Lanka',
	// 	    value: 20876917
	// 	}, {
	// 	    id: '3.143',
	// 	    parent: '2.13',
	// 	    name: 'Bhutan',
	// 	    value: 807610
	// 	}, {
	// 	    id: '3.144',
	// 	    parent: '2.13',
	// 	    name: 'Maldives',
	// 	    value: 436330
	// 	},

	// 	{
	// 	    id: '2.11',
	// 	    parent: '1.3',
	// 	    name: 'TATA'
	// 	},

	// 	{
	// 	    id: '3.117',
	// 	    parent: '2.11',
	// 	    name: 'China',
	// 	    value: 1409517397
	// 	}, {
	// 	    id: '3.118',
	// 	    parent: '2.11',
	// 	    name: 'Japan',
	// 	    value: 127484450
	// 	}, {
	// 	    id: '3.119',
	// 	    parent: '2.11',
	// 	    name: 'South Korea',
	// 	    value: 50982212
	// 	}, {
	// 	    id: '3.120',
	// 	    parent: '2.11',
	// 	    name: 'North Korea',
	// 	    value: 25490965
	// 	}, {
	// 	    id: '3.121',
	// 	    parent: '2.11',
	// 	    name: 'Taiwan',
	// 	    value: 23626456
	// 	}, {
	// 	    id: '3.122',
	// 	    parent: '2.11',
	// 	    name: 'Hong Kong',
	// 	    value: 7364883
	// 	}, {
	// 	    id: '3.123',
	// 	    parent: '2.11',
	// 	    name: 'Mongolia',
	// 	    value: 3075647
	// 	}, {
	// 	    id: '3.124',
	// 	    parent: '2.11',
	// 	    name: 'Macau',
	// 	    value: 622567
	// 	},

	// 	{
	// 	    id: '2.12',
	// 	    parent: '1.3',
	// 	    name: 'ADANI'
	// 	},

	// 	{
	// 	    id: '3.125',
	// 	    parent: '2.12',
	// 	    name: 'Indonesia',
	// 	    value: 263991379
	// 	}, {
	// 	    id: '3.126',
	// 	    parent: '2.12',
	// 	    name: 'Philippines',
	// 	    value: 104918090
	// 	}, {
	// 	    id: '3.127',
	// 	    parent: '2.12',
	// 	    name: 'Vietnam',
	// 	    value: 95540800
	// 	}, {
	// 	    id: '3.128',
	// 	    parent: '2.12',
	// 	    name: 'Thailand',
	// 	    value: 69037513
	// 	}, {
	// 	    id: '3.129',
	// 	    parent: '2.12',
	// 	    name: 'Myanmar',
	// 	    value: 53370609
	// 	}, {
	// 	    id: '3.130',
	// 	    parent: '2.12',
	// 	    name: 'Malaysia',
	// 	    value: 31624264
	// 	}, {
	// 	    id: '3.131',
	// 	    parent: '2.12',
	// 	    name: 'Cambodia',
	// 	    value: 16005373
	// 	}, {
	// 	    id: '3.132',
	// 	    parent: '2.12',
	// 	    name: 'Laos',
	// 	    value: 6858160
	// 	}, {
	// 	    id: '3.133',
	// 	    parent: '2.12',
	// 	    name: 'Singapore',
	// 	    value: 5708844
	// 	}, {
	// 	    id: '3.134',
	// 	    parent: '2.12',
	// 	    name: 'Timor-Leste',
	// 	    value: 1296311
	// 	}, {
	// 	    id: '3.135',
	// 	    parent: '2.12',
	// 	    name: 'Brunei',
	// 	    value: 428697
	// 	    // 'color': ''
	// 	},

	// 	{
	// 	    id: '2.14',
	// 	    parent: '1.3',
	// 	    name: 'Western Asia'
	// 	},

	// 	{
	// 	    id: '3.145',
	// 	    parent: '2.14',
	// 	    name: 'Turkey',
	// 	    value: 80745020
	// 	}, {
	// 	    id: '3.146',
	// 	    parent: '2.14',
	// 	    name: 'Iraq',
	// 	    value: 38274618
	// 	}, {
	// 	    id: '3.147',
	// 	    parent: '2.14',
	// 	    name: 'Saudi Arabia',
	// 	    value: 32938213
	// 	}, {
	// 	    id: '3.148',
	// 	    parent: '2.14',
	// 	    name: 'Yemen',
	// 	    value: 28250420
	// 	}, {
	// 	    id: '3.149',
	// 	    parent: '2.14',
	// 	    name: 'Syria',
	// 	    value: 18269868
	// 	}, {
	// 	    id: '3.150',
	// 	    parent: '2.14',
	// 	    name: 'Azerbaijan',
	// 	    value: 9827589
	// 	}, {
	// 	    id: '3.151',
	// 	    parent: '2.14',
	// 	    name: 'Jordan',
	// 	    value: 9702353
	// 	}, {
	// 	    id: '3.152',
	// 	    parent: '2.14',
	// 	    name: 'United Arab Emirates',
	// 	    value: 9400145
	// 	}, {
	// 	    id: '3.153',
	// 	    parent: '2.14',
	// 	    name: 'Israel',
	// 	    value: 8321570
	// 	}, {
	// 	    id: '3.154',
	// 	    parent: '2.14',
	// 	    name: 'Lebanon',
	// 	    value: 6082357
	// 	}, {
	// 	    id: '3.155',
	// 	    parent: '2.14',
	// 	    name: 'Palestine',
	// 	    value: 4920724
	// 	}, {
	// 	    id: '3.156',
	// 	    parent: '2.14',
	// 	    name: 'Oman',
	// 	    value: 4636262
	// 	}, {
	// 	    id: '3.157',
	// 	    parent: '2.14',
	// 	    name: 'Kuwait',
	// 	    value: 4136528
	// 	}, {
	// 	    id: '3.158',
	// 	    parent: '2.14',
	// 	    name: 'Georgia',
	// 	    value: 3912061
	// 	}, {
	// 	    id: '3.159',
	// 	    parent: '2.14',
	// 	    name: 'Armenia',
	// 	    value: 2930450
	// 	}, {
	// 	    id: '3.160',
	// 	    parent: '2.14',
	// 	    name: 'Qatar',
	// 	    value: 2639211
	// 	}, {
	// 	    id: '3.161',
	// 	    parent: '2.14',
	// 	    name: 'Bahrain',
	// 	    value: 1492584
	// 	},

	// 	{
	// 	    id: '2.10',
	// 	    parent: '1.3',
	// 	    name: 'Central Asia'
	// 	},

	// 	{
	// 	    id: '3.112',
	// 	    parent: '2.10',
	// 	    name: 'Uzbekistan',
	// 	    value: 31910641
	// 	}, {
	// 	    id: '3.113',
	// 	    parent: '2.10',
	// 	    name: 'Kazakhstan',
	// 	    value: 18204499
	// 	}, {
	// 	    id: '3.114',
	// 	    parent: '2.10',
	// 	    name: 'Tajikistan',
	// 	    value: 8921343
	// 	}, {
	// 	    id: '3.115',
	// 	    parent: '2.10',
	// 	    name: 'Kyrgyzstan',
	// 	    value: 6045117
	// 	}, {
	// 	    id: '3.116',
	// 	    parent: '2.10',
	// 	    name: 'Turkmenistan',
	// 	    value: 5758075
	// 	},
	// 	/***********/

	// 	/* Europe */
	// 	{
	// 	    id: '2.15',
	// 	    parent: '1.4',
	// 	    name: 'Eastern Europe'
	// 	},

	// 	{
	// 	    id: '3.162',
	// 	    parent: '2.15',
	// 	    name: 'Russia',
	// 	    value: 143989754
	// 	}, {
	// 	    id: '3.163',
	// 	    parent: '2.15',
	// 	    name: 'Ukraine',
	// 	    value: 44222947
	// 	}, {
	// 	    id: '3.164',
	// 	    parent: '2.15',
	// 	    name: 'Poland',
	// 	    value: 38170712
	// 	}, {
	// 	    id: '3.165',
	// 	    parent: '2.15',
	// 	    name: 'Romania',
	// 	    value: 19679306
	// 	}, {
	// 	    id: '3.166',
	// 	    parent: '2.15',
	// 	    name: 'Czechia',
	// 	    value: 10618303
	// 	}, {
	// 	    id: '3.167',
	// 	    parent: '2.15',
	// 	    name: 'Hungary',
	// 	    value: 9721559
	// 	}, {
	// 	    id: '3.168',
	// 	    parent: '2.15',
	// 	    name: 'Belarus',
	// 	    value: 9468338
	// 	}, {
	// 	    id: '3.169',
	// 	    parent: '2.15',
	// 	    name: 'Bulgaria',
	// 	    value: 7084571
	// 	}, {
	// 	    id: '3.170',
	// 	    parent: '2.15',
	// 	    name: 'Slovakia',
	// 	    value: 5447662
	// 	}, {
	// 	    id: '3.171',
	// 	    parent: '2.15',
	// 	    name: 'Moldova',
	// 	    value: 4051212
	// 	}, {
	// 	    id: '3.172',
	// 	    parent: '2.15',
	// 	    name: 'Cyprus',
	// 	    value: 1179551
	// 	},

	// 	{
	// 	    id: '2.16',
	// 	    parent: '1.4',
	// 	    name: 'Northern Europe'
	// 	},

	// 	{
	// 	    id: '3.173',
	// 	    parent: '2.16',
	// 	    name: 'United Kingdom',
	// 	    value: 66181585
	// 	}, {
	// 	    id: '3.174',
	// 	    parent: '2.16',
	// 	    name: 'Sweden',
	// 	    value: 9910701
	// 	}, {
	// 	    id: '3.175',
	// 	    parent: '2.16',
	// 	    name: 'Denmark',
	// 	    value: 5733551
	// 	}, {
	// 	    id: '3.176',
	// 	    parent: '2.16',
	// 	    name: 'Finland',
	// 	    value: 5523231
	// 	}, {
	// 	    id: '3.177',
	// 	    parent: '2.16',
	// 	    name: 'Norway',
	// 	    value: 5305383
	// 	}, {
	// 	    id: '3.178',
	// 	    parent: '2.16',
	// 	    name: 'Ireland',
	// 	    value: 4761657
	// 	}, {
	// 	    id: '3.179',
	// 	    parent: '2.16',
	// 	    name: 'Lithuania',
	// 	    value: 2890297
	// 	}, {
	// 	    id: '3.180',
	// 	    parent: '2.16',
	// 	    name: 'Latvia',
	// 	    value: 1949670
	// 	}, {
	// 	    id: '3.181',
	// 	    parent: '2.16',
	// 	    name: 'Estonia',
	// 	    value: 1309632
	// 	}, {
	// 	    id: '3.182',
	// 	    parent: '2.16',
	// 	    name: 'Iceland',
	// 	    value: 335025
	// 	}, {
	// 	    id: '3.183',
	// 	    parent: '2.16',
	// 	    name: 'Guernsey and  Jersey',
	// 	    value: 165314
	// 	}, {
	// 	    id: '3.184',
	// 	    parent: '2.16',
	// 	    name: 'Isle of Man',
	// 	    value: 84287
	// 	}, {
	// 	    id: '3.185',
	// 	    parent: '2.16',
	// 	    name: 'Faroe Islands',
	// 	    value: 49290
	// 	},

	// 	{
	// 	    id: '2.17',
	// 	    parent: '1.4',
	// 	    name: 'Southern Europe'
	// 	},

	// 	{
	// 	    id: '3.186',
	// 	    parent: '2.17',
	// 	    name: 'Italy',
	// 	    value: 59359900
	// 	}, {
	// 	    id: '3.187',
	// 	    parent: '2.17',
	// 	    name: 'Spain',
	// 	    value: 46354321
	// 	}, {
	// 	    id: '3.188',
	// 	    parent: '2.17',
	// 	    name: 'Greece',
	// 	    value: 11159773
	// 	}, {
	// 	    id: '3.189',
	// 	    parent: '2.17',
	// 	    name: 'Portugal',
	// 	    value: 10329506
	// 	}, {
	// 	    id: '3.190',
	// 	    parent: '2.17',
	// 	    name: 'Serbia',
	// 	    value: 8790574
	// 	}, {
	// 	    id: '3.191',
	// 	    parent: '2.17',
	// 	    name: 'Croatia',
	// 	    value: 4189353
	// 	}, {
	// 	    id: '3.192',
	// 	    parent: '2.17',
	// 	    name: 'Bosnia and Herzegovina',
	// 	    value: 3507017
	// 	}, {
	// 	    id: '3.193',
	// 	    parent: '2.17',
	// 	    name: 'Albania',
	// 	    value: 2930187
	// 	}, {
	// 	    id: '3.194',
	// 	    parent: '2.17',
	// 	    name: 'Republic of Macedonia',
	// 	    value: 2083160
	// 	}, {
	// 	    id: '3.195',
	// 	    parent: '2.17',
	// 	    name: 'Slovenia',
	// 	    value: 2079976
	// 	}, {
	// 	    id: '3.196',
	// 	    parent: '2.17',
	// 	    name: 'Montenegro',
	// 	    value: 628960
	// 	}, {
	// 	    id: '3.197',
	// 	    parent: '2.17',
	// 	    name: 'Malta',
	// 	    value: 430835
	// 	}, {
	// 	    id: '3.198',
	// 	    parent: '2.17',
	// 	    name: 'Andorra',
	// 	    value: 76965
	// 	}, {
	// 	    id: '3.199',
	// 	    parent: '2.17',
	// 	    name: 'Gibraltar',
	// 	    value: 34571
	// 	}, {
	// 	    id: '3.200',
	// 	    parent: '2.17',
	// 	    name: 'San Marino',
	// 	    value: 33400
	// 	}, {
	// 	    id: '3.201',
	// 	    parent: '2.17',
	// 	    name: 'Vatican City',
	// 	    value: 792
	// 	},

	// 	{
	// 	    id: '2.18',
	// 	    parent: '1.4',
	// 	    name: 'Western Europe'
	// 	},

	// 	{
	// 	    id: '3.202',
	// 	    parent: '2.18',
	// 	    name: 'Germany',
	// 	    value: 82114224
	// 	}, {
	// 	    id: '3.203',
	// 	    parent: '2.18',
	// 	    name: 'France',
	// 	    value: 64979548
	// 	}, {
	// 	    id: '3.204',
	// 	    parent: '2.18',
	// 	    name: 'Netherlands',
	// 	    value: 17035938
	// 	}, {
	// 	    id: '3.205',
	// 	    parent: '2.18',
	// 	    name: 'Belgium',
	// 	    value: 11429336
	// 	}, {
	// 	    id: '3.206',
	// 	    parent: '2.18',
	// 	    name: 'Austria',
	// 	    value: 8735453
	// 	}, {
	// 	    id: '3.207',
	// 	    parent: '2.18',
	// 	    name: 'Switzerland',
	// 	    value: 8476005
	// 	}, {
	// 	    id: '3.208',
	// 	    parent: '2.18',
	// 	    name: 'Luxembourg',
	// 	    value: 583455
	// 	}, {
	// 	    id: '3.209',
	// 	    parent: '2.18',
	// 	    name: 'Monaco',
	// 	    value: 38695
	// 	}, {
	// 	    id: '3.210',
	// 	    parent: '2.18',
	// 	    name: 'Liechtenstein',
	// 	    value: 37922
	// 	},
	// 	/***********/

	// 	/* Oceania */
	// 	{
	// 	    id: '2.19',
	// 	    parent: '1.5',
	// 	    name: 'Australia and New Zealand'
	// 	},

	// 	{
	// 	    id: '3.211',
	// 	    parent: '2.19',
	// 	    name: 'Australia',
	// 	    value: 24450561
	// 	}, {
	// 	    id: '3.212',
	// 	    parent: '2.19',
	// 	    name: 'New Zealand',
	// 	    value: 4705818
	// 	},

	// 	{
	// 	    id: '2.20',
	// 	    parent: '1.5',
	// 	    name: 'Melanesia'
	// 	},

	// 	{
	// 	    id: '3.213',
	// 	    parent: '2.20',
	// 	    name: 'Papua New Guinea'
	// 	}, {
	// 	    id: '3.214',
	// 	    parent: '2.20',
	// 	    name: 'Fiji',
	// 	    value: 905502
	// 	}, {
	// 	    id: '3.215',
	// 	    parent: '2.20',
	// 	    name: 'Solomon Islands',
	// 	    value: 611343
	// 	}, {
	// 	    id: '3.216',
	// 	    parent: '2.20',
	// 	    name: 'New Caledonia',
	// 	    value: 276255
	// 	}, {
	// 	    id: '3.217',
	// 	    parent: '2.20',
	// 	    name: 'Vanuatu',
	// 	    value: 276244
	// 	},

	// 	{
	// 	    id: '2.21',
	// 	    parent: '1.5',
	// 	    name: 'Micronesia'
	// 	},

	// 	{
	// 	    id: '3.218',
	// 	    parent: '2.21',
	// 	    name: 'Guam',
	// 	    value: 164229
	// 	}, {
	// 	    id: '3.219',
	// 	    parent: '2.21',
	// 	    name: 'Kiribati',
	// 	    value: 116398
	// 	}, {
	// 	    id: '3.220',
	// 	    parent: '2.21',
	// 	    name: 'Federated States of Micronesia',
	// 	    value: 105544
	// 	}, {
	// 	    id: '3.221',
	// 	    parent: '2.21',
	// 	    name: 'Northern Mariana Islands',
	// 	    value: 55144
	// 	}, {
	// 	    id: '3.222',
	// 	    parent: '2.21',
	// 	    name: 'Marshall Islands',
	// 	    value: 53127
	// 	}, {
	// 	    id: '3.223',
	// 	    parent: '2.21',
	// 	    name: 'Palau',
	// 	    value: 21729
	// 	}, {
	// 	    id: '3.224',
	// 	    parent: '2.21',
	// 	    name: 'Nauru',
	// 	    value: 11359
	// 	},

	// 	{
	// 	    id: '2.22',
	// 	    parent: '1.5',
	// 	    name: 'Polynesia'
	// 	},

	// 	{
	// 	    id: '3.225',
	// 	    parent: '2.22',
	// 	    name: 'French Polynesia',
	// 	    value: 283007
	// 	}, {
	// 	    id: '3.226',
	// 	    parent: '2.22',
	// 	    name: 'Samoa',
	// 	    value: 196440
	// 	}, {
	// 	    id: '3.227',
	// 	    parent: '2.22',
	// 	    name: 'Tonga',
	// 	    value: 108020
	// 	}, {
	// 	    id: '3.228',
	// 	    parent: '2.22',
	// 	    name: 'American Samoa',
	// 	    value: 55641
	// 	}, {
	// 	    id: '3.229',
	// 	    parent: '2.22',
	// 	    name: 'Cook Islands',
	// 	    value: 17380
	// 	}, {
	// 	    id: '3.230',
	// 	    parent: '2.22',
	// 	    name: 'Wallis and Futuna',
	// 	    value: 11773
	// 	}, {
	// 	    id: '3.231',
	// 	    parent: '2.22',
	// 	    name: 'Tuvalu',
	// 	    value: 11192
	// 	}, {
	// 	    id: '3.232',
	// 	    parent: '2.22',
	// 	    name: 'Niue',
	// 	    value: 1618
	// 	}, {
	// 	    id: '3.233',
	// 	    parent: '2.22',
	// 	    name: 'Tokelau',
	// 	    value: 1300
	// 	}];
	
	// data5=this.operational_service;
	

	
	chartOption_1:any = {   
		chart: {
			type: 'column',
			height:250,
			width:900,
		},
		title: {
			text: 'Purchase And Sale'
		},
		// subtitle:{
		//    text: '' 
		// },
		xAxis:{
			categories: this.apiDate,
			//crosshair: true        
		},     
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
			name: 'Purchase',
			data: this.purchaseData
		}, 
		{
			name: 'Sale',
			data: this.saleData
		},]
	};


	//pie chart------->
	
	chartOption_2:any = {   
		chart : {
		plotBorderWidth: null,
		plotShadow: false,
		height:250,
		width:400,
		},
		title : {
			text: 'Product Sale'   
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
		series : [{
			type: 'pie',
			name: 'Browser share',
			data: [
			['Item-1',   45.0],
			['Item-2',       26.8],
			{
				name: 'Item-3',
				y: 12.8,
				sliced: true,
				selected: true
			},
			['Item-4',    8.5],
			['Item-5',     6.2],
			['Item-6',      0.7]
			]
		}]
	};

	//3rd Chart------->
	chartOption_3:any = {
		chart: {
			type: 'bar',
			height:600,
			width:400,
		},
		title: {
			text: 'Yearly Sales'
		},
		subtitle: {
			// text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
		},
		xAxis: {
			categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Sales (millions)',
				align: 'high'
			},
			labels: {
				overflow: 'justify'
			}
		},
		tooltip: {
			valueSuffix: ' millions'
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 80,
			floating: true,
			borderWidth: 1,
			shadow: true
		},
		credits: {
			enabled: false
		},
		series: [{
			name: 'Year 2019',
			data: [107, 31, 635, 203, 2]
		}, {
			name: 'Year 2020',
			data: [133, 156, 947, 408, 6]
		}, {
			name: 'Year 2021',
			data: [814, 841, 3714, 727, 31]
		}, {
			name: 'Year 2022',
			data: [1216, 1001, 4436, 738, 40]
		}]
	}

   //Scatter plot
   chartOption_4:any = {         
		title : {
			text: 'Scatter plot'   
		},     
		chart: {
		
		height:250,
		width:400
		}, 
		series : [{
			type: 'scatter',
			zoomType:'xy',
			name: 'Browser share',
			data: [ 1, 1.5, 2.8, 3.5, 3.9, 4.2 ]
		}]
	};

	confirmInvitation(data:any, index:any){
			console.log(data, 'inviteeee')
	    const dialogRef = this.dialog.open(ConfirmComponent,{
	      width:'30%',
	      data:{
	        data:data,
	        title:'Do you want to confirm invitation.'
	      }
	    });
		console.log(data,'lllllllllllllllll')
	    dialogRef.afterClosed().subscribe(result => {
		    if(result){
		    		console.log(result, 'result')
		        this.auth.patchAPI('invite/'+result['id']+'/',{'verified':true}).subscribe(response=>{
		          this.dataSource.data.splice(index, 1)
		          this.dataSource._updateChangeSubscription()
		          // this.router.navigate(['/company'])
		          // this.auth.getAPI('company/'+response['companies']['slug']).subscribe(result=>{
		          //   this.auth.changeCompany(result)
		          // })
		          this._snackBar.open('Invitation accept.','', {duration: 5000, panelClass: ['greenPSSnackbar']});
		        })
		    }
	    })
	}

	cancelInvitation(data:any, index:any){
	    const dialogRef = this.dialog.open(ConfirmComponent,{
	      width:'30%',
	      data:{
	        data:data,
	        title:'Do you want to cancel this invitation?'
	      }
	    });
	    dialogRef.afterClosed().subscribe(result => {
	      if(result){
	        this.auth.patchAPI('invite/'+result['id']+'/',{'status':'Inactive'}).subscribe(response=>{
	          this.dataSource.data.splice(index, 1)
	          this.dataSource._updateChangeSubscription()
	          this._snackBar.open('Invitation cancelled.','', {duration: 5000, panelClass: ['greenPSSnackbar']});
	        })
	      }
	    })
	}

	
}
