import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormGroup,} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {


	productForm = this.fb.group({
		category :[null,Validators.required],
		name :[null, Validators.required],
		description :[null, Validators.required],
		quantity : [null,Validators.required],
		sale : [null,Validators.required],
		purchase : [null,Validators.required],
		
		});
	
	categoryList:any = []
	title = 'Add'
	errors = ''
	message = ''
	product_id:any = null
	 //for permissions---------->
	userPermissions :any=[]
	 
	addProd = false;
	editProduct = false;
	 
	constructor(private fb: FormBuilder,private location : Location,private _route:ActivatedRoute, private _router:Router,private auth : AuthenticationService,private spinner: NgxSpinnerService) {
		this.spinner.show();
	 }

	ngOnInit(): void {
		this.loadCategory()
		this.userPermissions = localStorage.getItem('userPermissions')
		if(this.userPermissions.includes("item.add_item")){
			this.addProd = true
		}
		if(this.userPermissions.includes("item.change_item")){
			this.editProduct = true
		}
		//console.log(this.categoryList,'1111111111111111111111111')
		this.product_id = this._route.snapshot.paramMap.get('id')
		if(this.product_id!=null){
			this.title = 'Edit'
		}
		this.loadProductDetail()
		//console.log(this.product_id,'productidddddddddddddddddddd')
	}

	get f() { return this.productForm.controls; }
	loadCategory(){
		this.auth.getAPI('category/').subscribe(response=>{
			this.categoryList.push(response.results)
			this.spinner.hide()
		},error=>{
			//console.log(error.detail,'errorrrrrr')
		})
	}

	addProduct(){
		if(this.product_id!=null){
			this.auth.putAPI('item/'+this.product_id+'/',this.productForm.value).subscribe(responce=>{
				this._router.navigate(['/inventory/product']);
				//console.log()
			})
		}else{
			this.auth.postAPI('item/',this.productForm.value).subscribe(responce=>{
				if(responce.id){
					this._router.navigate(['/inventory/product']);
				}
			})
		}
	}

	loadProductDetail(){
		if(this.product_id!= null){
			this.auth.getAPI('item/'+this.product_id+'/').subscribe(data=>{
				this.f.category.setValue(data.category)
				this.f.name.setValue(data.name)
				this.f.description.setValue(data.description)
				this.f.quantity.setValue(data.quantity)
				this.f.sale.setValue(data.sale)
				this.f.purchase.setValue(data.purchase)

				//console.log(data,'ddddddddddddddddd')
			},error=>{
				this.errors = error.detail
				//console.log(error,'errrrorrrrrrrrrrr')
			})
		}
	}
	
	onCancel(){
		this.location.back();
	}

}
