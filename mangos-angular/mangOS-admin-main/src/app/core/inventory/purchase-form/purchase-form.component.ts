import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray} from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-purchase-form',
	templateUrl: './purchase-form.component.html',
	styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {

	purchaseForm = this.fb.group({
		description :[null, Validators.required],
		order_status : [null,Validators.required],
		user : [null,Validators.required],
		order : this.fb.array([this.fb.group(
			{ item:[null,Validators.required],
			quantity:[0,Validators.required],
			price:[0,Validators.required],
			tax:[0,Validators.required]
		})]),
	});


	// For Form Array------->
	get order(){
		return this.purchaseForm.get('order') as FormArray;
	}

	constructor(private fb: FormBuilder , private auth:AuthenticationService,private spinner: NgxSpinnerService,private location : Location,private router : Router, private activeRoute : ActivatedRoute,public dialog: MatDialog) { 
		this.spinner.show()
	}

	userPermissions :any=[]
	itemList:any =[]	// for items 
	userList:any =[] //for userlist....
	taxList:any =[]		//for taxlist ------->


	purchaseId:any =null;
	message = '';
	title = 'Add New Purchase Item'
	addPurchase = false;
	editPurchase = false;
	
	errors = ''

	wishlists:any = []

	ngOnInit(): void {
		this.userPermissions = localStorage.getItem('userPermissions')
		if(this.userPermissions.includes("order.add_order")){
			this.addPurchase = true
		}
		// to get id for edit-purchase-form---------
		this.purchaseId = this.activeRoute.snapshot.paramMap.get('id')
		if(this.purchaseId!=null){
			this.title = "Edit Purchase Item"
		}
		this.loadData()
	}


	
	loadData(){
		this.auth.getAPI('item/').subscribe(responce=>{ //to get data of item dropdown
			this.itemList = responce.results
		})
		this.auth.getAPI('user/').subscribe(responce=>{ ////to get data of User dropdown
			this.userList = responce.results
			if(this.purchaseId === null){
				this.spinner.hide()
			}
		})
		this.auth.getAPI('tax').subscribe(responce=>{
			this.taxList = responce.results
			//console.log(responce,'8888888')
		})
		if(this.purchaseId!= null){
			this.purchaseDetail()
		}
	}

	onCancel(){
		this.location.back();
	}

	addPurchaseOrder(){
		let data = {
			purchase : true,
			sale : false,
			order_status : this.purchaseForm.get('order_status')?.value,
			description : this.purchaseForm.get('description')?.value,
			wishlists : this.purchaseForm.get('order')?.value,
			user : this.purchaseForm.get('user')?.value,
			
		}// for edit form------------->
		if(this.purchaseId!=null){
			this.auth.patchAPI('order/'+this.purchaseId+'/',data).subscribe(Response=>{
				this.router.navigate(['/inventory/purchase']);
			},error=>{
				//console.log(error.error.detail,'rrrrrrrrrr')
				let errorDetail = [error.error['detail']]
				this.dialog.open(DeleteComponent,{
					width:"30%",
					data:{
						title: 'Error',
						error :errorDetail,
						//error_detail : error.error,
					}
				});
			})
		}
		// for add new purchase form------------->
		else{
			this.auth.postAPI('order/',data).subscribe(responce=>{
			
				if(responce.id){
					this.router.navigate(['/inventory/purchase']);
				}
			});
		}
	}


	get f() { return this.purchaseForm.controls; }
	purchaseDetail(){
		this.auth.getAPI('order/'+this.purchaseId).subscribe(responce=>{
			this.f.description.setValue(responce.description)
			this.f.order_status.setValue(responce.order_status)
			this.f.user.setValue(responce.user)
			this.wishlists = responce.wishlists
			
			this.order.removeAt(0) // to remove first default row in form
			for(let i = 0;i<responce.wishlists.length;i++){
				this.order.push(this.fb.group({item : this.wishlists[i].item,quantity:this.wishlists[i].quantity,price : this.wishlists[i].price ,tax : this.wishlists[i].tax }))
			}
			this.spinner.hide()
		})
	}

	//To add new row in form------------>
	addItems(){
		this.order.push(this.fb.group({item:[null,Validators.required],quantity:[0,Validators.required],price:[0,Validators.required],tax:[0,Validators.required]}));
	}

	// To Delete Row in Form---------->
	removeRow(i:number){
		// for edit purchase form---------->
		let data = this.order.value
		
		if(this.purchaseId!=null){
			if(data[i].item != null){
				this.deleteRowDialog(i)
			}else{
				this.order.removeAt(i);
			}
		}//for add new purchase ---------------->
		else{
			
			if(data[i].item != null){
				this.deleteRowDialog(i)
			}else{
				this.order.removeAt(i);
			}
		}
	}

	deleteRowDialog(i:number){
		let dialogRef =this.dialog.open(DeleteComponent,{
			width:"25%",
			data:{
				title: 'row',
				delete:'true',
				indx: i,
			}
		});
		dialogRef.afterClosed().subscribe(responce => {
			// when seleted ok--------->
			if(responce === i && this.purchaseId != null){
				//console.log(this.wishlists[i].id,'1111111')
				this.auth.patchAPI('wishlist/'+this.wishlists[i].id+'/',{'status':'Delete'}).subscribe(responce=>{
					this.order.removeAt(i);
					//console.log(responce)
				},error=>{
					//console.log(error.error.detail,'rrrrrrrrrr')
					let errorDetail = [error.error['detail']]
					this.dialog.open(DeleteComponent,{
						width:"30%",
						data:{
							title: 'Error',
							error :errorDetail,
							//error_detail : error.error,
						}
					});
				})
			}else if (responce === i ){
				this.order.removeAt(i);
			}
		})
	}
}
