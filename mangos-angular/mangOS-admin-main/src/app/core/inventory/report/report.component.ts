import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
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
					{ title: 'Card 1', cols: 1, rows: 1 },
					{ title: 'Card 2', cols: 1, rows: 1 },
					{ title: 'Card 3', cols: 1, rows: 1 },
					{ title: 'Card 4', cols: 1, rows: 1 }
				];
			}

			return [
				{ title: 'Card 1', cols: 2, rows: 1 },
				{ title: 'Card 2', cols: 1, rows: 1 },
				{ title: 'Card 3', cols: 1, rows: 2 },
				{ title: 'Card 4', cols: 1, rows: 1 }
			];
		})
	);

	apiDate:any = [];
	purchaseData :any=[];
	saleData : any =[];

	constructor(private breakpointObserver: BreakpointObserver,private auth : AuthenticationService,private spinner: NgxSpinnerService) {
		this.spinner.show()
		this.auth.getAPI('dashboard/').subscribe(response=>{
			for(let i = 0; i < response.results['purchase'].length;i++){
				this.apiDate.push(Object.keys(response.results['purchase'][i]).toString())
				this.saleData.push(parseInt(Object.values(response.results['sale'][i]).toString()))
				this.purchaseData.push(parseInt(Object.values(response.results['purchase'][i]).toString()))
			}
			Highcharts.chart('container',this.chartOption_1)
			Highcharts.chart('container-2',this.chartOption_2)
			Highcharts.chart('container-3',this.chartOption_3)
			Highcharts.chart('container-4',this.chartOption_4)
			this.spinner.hide()
		})
	}

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
			text: "Purchase and sale "
		},
		subtitle: {
			text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
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
				text: 'Population (millions)',
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
			name: 'Year 1800',
			data: [107, 31, 635, 203, 2]
		}, {
			name: 'Year 1900',
			data: [133, 156, 947, 408, 6]
		}, {
			name: 'Year 2000',
			data: [814, 841, 3714, 727, 31]
		}, {
			name: 'Year 2016',
			data: [1216, 1001, 4436, 738, 40]
		}]
	};

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
}
