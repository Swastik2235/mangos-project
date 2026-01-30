import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-packaging-detail',
	templateUrl: './packaging-detail.component.html',
	styleUrls: ['./packaging-detail.component.scss'],
	encapsulation:ViewEncapsulation.None
})
export class PackagingDetailComponent implements OnInit {

	data:any;

	constructor(@Inject(MAT_DIALOG_DATA) public mydata:any, private dialogRef:MatDialogRef<PackagingDetailComponent>, private auth:AuthenticationService) {
		this.data = mydata.jcdata;
	 }

	ngOnInit(): void {
		console.log(this.data)
	}

}
