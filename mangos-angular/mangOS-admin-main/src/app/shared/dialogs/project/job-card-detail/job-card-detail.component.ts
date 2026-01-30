import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service'
import * as Highcharts from 'highcharts';
import HighchartsSankey from "highcharts/modules/sankey";
HighchartsSankey(Highcharts);

@Component({
	selector: 'app-job-card-detail',
	templateUrl: './job-card-detail.component.html',
	styleUrls: ['./job-card-detail.component.scss'],
	encapsulation:ViewEncapsulation.None
})

export class JobCardDetailComponent implements OnInit {

	sJobCardData:any;
	value:any;
	unittotal:number = 0;
	qtytotal:number = 0;
	weighttotal:number = 0;
	totalEmboPcs:number = 0;
	totalWtInKgs:number = 0;
	chartOption:any = {

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
				['MS 75X75X6','CPS',8],
				['MS 90X90X7','CPS',8],
				['MS 70X70X5','CPS',8],
				['HT 10 MM PLATE','CPS',8],
				['CPS', 'N', 15],
				['CPS', 'B', 8],
				['CPS', 'HC', 5],
				['N', 'HG', 5],
				['B', 'HAB', 8],
				['HG', 'GAlVA', 5],
				['HAB', 'GAlVA', 8],
				['HC', 'GAlVA', 5],
				['N', 'GAlVA', 10],
				['CPS', 'GAlVA', 4],
			],
			type: 'sankey',
			name: 'Sankey demo series'
		}]
	
	};
	
	constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dialogRef:MatDialogRef<JobCardDetailComponent>, private auth:AuthenticationService) {
		this.sJobCardData = data.jcdata;
		console.log(this.sJobCardData,'loooooooooool')
		this.totalSum(this.sJobCardData.jobitems)
		this.totalEmboSum(this.sJobCardData.embossings)
	}
	
	ngOnInit(): void {
		Highcharts.chart('container',this.chartOption);
	}

	totalSum(data:any){
		this.value=data 
		for(let j=0;j<data.length;j++){ 
			this.unittotal+= this.value[j].unit
			this.qtytotal+= this.value[j].quantity
			this.weighttotal+= this.value[j].total_weight
			// this.weighttotal= this.value[j].total_weight
		}
	}
	op_checked(str:string,id:number,i:number){
		let v
		if(str=='hab'){
			v = {hab:true}
		}
		else if(str=='cps'){
			v = {cps:true}
		}
		else if(str=='hc'){
			v = {hc:true}
		}
		else if(str=='d'){
			v = {d:true}
		}
		else if(str=='n'){
			v = {n:true}
		}
		else if(str=='b'){
			v = {b:true}
		}
		else if(str=='g'){
			v = {g:true}
		}
		else if(str=='progress'){
			v = {progress:'Completed'}
		}
		else{
			v={}
		}
		console.log(v)
		this.auth.patchAPI('job-item/'+id+'/',v).subscribe(res=>{
			this.sJobCardData.jobitems[i]=res
		})
	}
	totalEmboSum(data:any){
		this.value=data 
		for(let j=0;j<data.length;j++){ 
			this.totalEmboPcs += this.value[j].pcs
			this.totalWtInKgs += this.value[j].total_weight
		}
	}

}
