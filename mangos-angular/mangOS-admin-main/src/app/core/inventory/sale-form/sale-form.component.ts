import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-sale-form',
	templateUrl: './sale-form.component.html',
	styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent implements OnInit {


	saleForm = this.fb.group({
		description :[null, Validators.required],
		order_status : [null,Validators.required],
		user : [null,Validators.required],
		order : this.fb.array([this.fb.group({
			item:[null,Validators.required],
			quantity:[0,Validators.required],
			price:[0,Validators.required],
			tax:[null,Validators.required]
		})]),
	});


	// For Form Array------->
	get order(){
		return this.saleForm.get('order') as FormArray;
	}

	constructor(private fb: FormBuilder , private auth:AuthenticationService,private spinner: NgxSpinnerService,private location : Location,private router : Router, private activeRoute : ActivatedRoute,public dialog: MatDialog) {
		this.spinner.show();
		this.loadData()
	}

	userPermissions :any=[]
	
	itemList:any =[]; // for items 
	userList:any =[]; //for userlist....
	saleId:any = null;
	taxList:any =[]	

	message = '';
	title = 'Add New Sale Item'
	addPurchase = false;
	editPurchase = false;

	wishlists:any = []
	
	errors = '';

	ngOnInit(): void {
		this.saleId = this.activeRoute.snapshot.paramMap.get('id')
		this.userPermissions = localStorage.getItem('userPermissions')
		if(this.userPermissions.includes("order.add_order")){
			this.addPurchase = true
		}
		// to get id for edit-purchase-form--------->
		if(this.saleId != null){
			this.title = "Edit Sale Item"
			this.saleDetail()
		}
	}

	loadData(){
		this.auth.getAPI('item/').subscribe(responce=>{ //to get data of item dropdown
			this.itemList = responce.results
		})
		this.auth.getAPI('user/').subscribe(responce=>{ ////to get data of user dropdown
			this.userList = responce.results
			if(this.saleId == null){
				this.spinner.hide()
			}
		})
		this.auth.getAPI('tax/').subscribe(responce=>{
			this.taxList = responce.results
		})
	}

	onCancel(){
		this.location.back();
	}
	
	addSaleOrder(){
		let data = {
			purchase : false,
			sale : true,
			order_status : this.saleForm.get('order_status')?.value,
			description : this.saleForm.get('description')?.value,
			wishlists : this.saleForm.get('order')?.value,
			user : this.saleForm.get('user')?.value,
			
		}// for edit form------------->
		if(this.saleId!=null){
			this.auth.putAPI('order/'+this.saleId+'/',data).subscribe(Response=>{
				this.router.navigate(['/inventory/sale']);
			},error=>{
				let errorDetail = [error.error['quantity']]
					this.dialog.open(DeleteComponent,{
						width:"40%",
						data:{
							title: 'Error',
							error :errorDetail,
						}
					});
				//console.log(error.error['quantity'],'77777777777777')
			});
		}
		// for add new purchase form------------->
		else{
			//console.log(data,'ddddddddddddd')
			this.auth.postAPI('order/',data).subscribe(responce=>{
				if(responce.id){
					this.router.navigate(['/inventory/sale']);
				}
			},error=>{
				let errorDetail = error.error['quantity']
					this.dialog.open(DeleteComponent,{
						width:"40%",
						data:{
							title: 'Error',
							error :errorDetail,
					}
				});
				//console.log(error.error['quantity'],'77777777777777')
			});
		}	
	}


	get f() { return this.saleForm.controls; }
	saleDetail(){
		console.log('llllllllll')
		this.auth.getAPI('order/'+this.saleId).subscribe(responce=>{
			console.log(responce,'ooooooooooooo')
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
	

	removeRow(i:number){
		// for edit purchase form---------->
		let data = this.order.value
		if(this.saleId!=null){
			
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
				indx: i
			}
		});
		dialogRef.afterClosed().subscribe(responce => {
			// when seleted yes--------->
			//console.log(responce,'4444444444',i)
			if(responce === i && this.saleId != null){
				this.auth.patchAPI('wishlist/'+this.wishlists[i].id+'/',{'status':'Delete'}).subscribe(responce=>{
					this.order.removeAt(i);
				},error=>{
					let errorDetail = [error.error['detail']]
					this.dialog.open(DeleteComponent,{
						width:"30%",
						data:{
							title: 'Error',
							error :errorDetail,
						}
					});
				})
			}else if (responce === i ){
				this.order.removeAt(i);
			}
		})
	}
}
