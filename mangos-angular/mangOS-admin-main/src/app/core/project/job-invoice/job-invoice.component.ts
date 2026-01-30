import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-job-invoice',
	templateUrl: './job-invoice.component.html',
	styleUrls: ['./job-invoice.component.scss'],
	encapsulation:ViewEncapsulation.None
})
export class JobInvoiceComponent implements OnInit {
	
	invoiceList:any=[]
	projectName:any;
	qtytotal:any;
	weighttotal:any;
	constructor(private auth:AuthenticationService,private router : Router, private _route : ActivatedRoute,private spinner: NgxSpinnerService) {
		this.projectName = this._route.snapshot.paramMap.get('slug')
		this.spinner.show()
	}

	ngOnInit(): void {
		this.auth.getAPI('job-card/?project__slug='+this.projectName).subscribe(result=>{
			console.log(result.results)
			this.invoiceList = result.results
			this.spinner.hide()
		})
	}
	print(): void {
		let printContents, popupWin;
		printContents = document.getElementById('print-section')?.innerHTML;
		popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
		popupWin?.document.open();
		popupWin?.document.write(`
		  <html>
			<head>
			  <title>`+this.projectName+` job cards</title>
			  <style>
			  .sign{
				margin-left: 20px;
				width: 150px;
				height: 70px;
			  }
			  .table {
				width: 100%;
				margin-bottom: 1rem;
				color: #212529;
			}
			th,td{
				padding: 0.75rem;
				vertical-align: top;
				border: 1px solid #dee2e6;
			}
			  </style>
			</head>
		<body onload="window.print();window.close()">${printContents}</body>
		  </html>`
		);
		popupWin?.document.close();
	}
}
