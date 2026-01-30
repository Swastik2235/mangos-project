import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-packaging-invoice',
	templateUrl: './packaging-invoice.component.html',
	styleUrls: ['./packaging-invoice.component.scss']
})
export class PackagingInvoiceComponent implements OnInit {

	invoiceList:any=[]
	projectName:any;
	qtytotal:any;
	weighttotal:any;
	constructor(private auth:AuthenticationService,private router : Router, private _route : ActivatedRoute,private spinner: NgxSpinnerService) { 
		this.projectName = this._route.snapshot.paramMap.get('slug')
		this.spinner.show()
	}

	ngOnInit(): void {
		this.auth.getAPI('dispatch/?project__slug='+this.projectName).subscribe(res=>{
			this.invoiceList = res.results
			console.log(this.invoiceList)
			this.spinner.hide()
		})
	}

}
