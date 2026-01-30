import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray} from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteComponent } from 'src/app/shared/dialogs/default/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-job-form',
	templateUrl: './job-form.component.html',
	styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

	jobForm = this.fb.group({
		project :[null, Validators.required],
		prepared : [null,Validators.required],
		authorized : [null,Validators.required],
		lot : [null,Validators.required],
		release : [null,Validators.required],
		jobitems : this.fb.array([this.fb.group(
			{ 	bom:[null,Validators.required],
				id:null,
				operation_data:{
					hab:{machine:[],operator:'',assistant:''},
					cps:{machine:[],operator:'',assistant:''},
					hc:{machine:[],operator:'',assistant:''},
					n:{machine:[],operator:'',assistant:''},
					b:{machine:[],operator:'',assistant:''},
					d:{machine:[],operator:'',assistant:''}},
				// mark:[null,Validators.required],
				number:[null,Validators.required],
				// section:[null,Validators.required],
				length:[null,Validators.required],
				width:[null,Validators.required],
				unit_weight:[null,Validators.required],
				piece_weight:[null,Validators.required],
				total_weight:[null,Validators.required],
				quantity:[null,Validators.required],
				tower_quantity:[null,Validators.required],
				operation:[null,Validators.required],
				cps:false,
				hc:false,
				n:false,
				b:false,
				hab:false,
				d:false,
				remark:[null,Validators.required],
				jobcard:[null,Validators.required],
		})]),
		embossings : this.fb.array([this.fb.group(
			{ 	
				title:[null,Validators.required],
				sin:[null,Validators.required],
				width:[null,Validators.required],
				length:[null,Validators.required],
				pcs:[null,Validators.required],
				unit_weight:[null,Validators.required],
				kg:[null,Validators.required],
				cl:[null,Validators.required],
				// total_weight:[null,Validators.required],
				// jobcard:[null,Validators.required],
				section:[null,Validators.required],
		})]),
		allocations: this.fb.array([this.fb.group(
			{ 	
				length1:[null,Validators.required],
				quantity1:[null,Validators.required],
				length2:[null,Validators.required],
				quantity2:[null,Validators.required],
				length3:[null,Validators.required],
				quantity3:[null,Validators.required],
				length4:[null,Validators.required],
				quantity4:[null,Validators.required],
				length:[null,Validators.required],
				quantity:[null,Validators.required],
				section:[null,Validators.required],
			})]),
	});
	
	get jobitems(){
		return this.jobForm.get('jobitems') as FormArray;
	}

	get embossing(){
		return this.jobForm.get('embossings') as FormArray;
	}
	
	get allocation(){
		return this.jobForm.get('allocations') as FormArray;
	}
	projectList:any=[];
	sectionL:any=[];
	sectionListt:any=[];
	sectionList:any=[];
	projectName:any;
	towerList:any=[];
	userList:any=[];
	nextPage:any = '';
	jobID:any=null;
	jobItemList:any=[];
	embosItemList:any = [];
	allocationItemList:any=[];
	eventM:any=[];
	machines:any=[];
	operationDataList:any=[{
		hab:{machine:[],operator:'',assistant:''},
		cps:{machine:[],operator:'',assistant:''},
		hc:{machine:[],operator:'',assistant:''},
		n:{machine:[],operator:'',assistant:''},
		b:{machine:[],operator:'',assistant:''},
		d:{machine:[],operator:'',assistant:''}}];
	constructor(private fb: FormBuilder , private auth:AuthenticationService,private spinner: NgxSpinnerService,private location : Location,private router : Router, private _route : ActivatedRoute,public dialog: MatDialog,private _snackBar: MatSnackBar) { 
		this.spinner.show()
		this.jobID = this._route.snapshot.paramMap.get('id')
		// console.log(this.jobID ,'iiiiiiii')
		this.projectName = this._route.snapshot.paramMap.get('slug')
		
		
	}

	ngOnInit(): void {
		
		if(this.jobID!=null){
			this.jobDetail()
			this.loadData()
			console.log('hello')
			
		}else{
			this.loadData()
			
		}
		
	}

	addJob(){
		for(let i in this.jobForm.value.jobitems){
			this.jobForm.value.jobitems[i].operation_data=this.operationDataList[i]
		}
		if(this.jobID!=null){
			this.auth.patchAPI('job-card/'+this.jobID+'/',this.jobForm.value).subscribe(res=>{
				this.openSnackBar("Job Card Updated")
				this.location.back();
			})
		}else{
			this.auth.postAPI('job-card/',this.jobForm.value).subscribe(res=>{
				// console.log(res,'rrrrrrrrrrr')
				this.openSnackBar("Job Card Created")
				this.location.back();
			})
		}
		
	}

	loadData(){
		this.auth.getAPI('user/').subscribe(result=>{
			// console.log(result.results)
			this.userList = result.results
		})
		// this.auth.getAPI('tower').subscribe(responce=>{
		// 	this.towerList = responce.results
		// })
		this.auth.getAPI('project/').subscribe(responce=>{
			// this.f.project.setValue(responce.id)
			this.projectList=responce.results
			console.log(responce,'rrrrrrrrr')
		})

		this.auth.getAPI('job-card/'+this.jobID).subscribe(result=>{
			// console.log(result, 'section listttttttt')
			this.sectionL = result['jobitems']
			for (var val of this.sectionL){
				this.sectionListt.push(val['bom_detail']['section_detail'])
			}
			const expected = new Set();
			this.sectionList = this.sectionListt.filter((item:any) => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
		
			// console.log(val['bom_detail']['section_detail']['title'], 'section listttttttt')
			console.log(this.sectionList,'ssssssssssssssssssssssllllllllllllllllllll')
			this.spinner.hide()
		})
	}

	// loadProjects(){
	// 	this.auth.getAPI('project/?'+this.nextPage).subscribe(responce=>{
	// 		this.projectList= this.projectList.concat(responce.results);
	// 		console.log(this.projectList)
	// 		if(responce.next != null){
	// 			this.nextPage = responce.next.split('?')[1]
	// 			this.loadProjects()
	// 		}
			
	// 		this.spinner.hide()
	// 	})
	// }
	op_checked(str:string,i:number){
		if(str=='hab'){
			this.jobitems.value[i].hab = true
		}
		else if(str=='cps'){
			this.jobitems.value[i].cps = true
		}
		else if(str=='hc'){
			this.jobitems.value[i].hc = true
		}
		else if(str=='d'){
			this.jobitems.value[i].d = true
		}
		else if(str=='n'){
			this.jobitems.value[i].n = true
		}
		else if(str=='b'){
			this.jobitems.value[i].b = true
		}
	}

	machineSelect(s:string,event: any=[],i:number){
		this.eventM=[]
		for(let j in event.value){
			this.eventM.push({id:event.value[j].id,title:event.value[j].title})
		}
		// debugger;
		if(s=='hab'){
			this.operationDataList[i].hab.machine=this.eventM
		}
		else if(s=='cps'){
			this.operationDataList[i].cps.machine=this.eventM
		}
		else if(s=='hc'){
			this.operationDataList[i].hc.machine=this.eventM
			console.log(event.value,i,'kkkkkkkkkkkkk', this.operationDataList)
		}
		else if(s=='n'){
			this.operationDataList[i].n.machine=this.eventM
		}
		else if(s=='b'){
			this.operationDataList[i].b.machine=this.eventM
		}
		else if(s=='d'){
			this.operationDataList[i].d.machine=this.eventM
		}
		console.log(s,event.value,'ssssssssssssss',this.operationDataList,i)
	}

	addOperator(s:string,event: any,i:number){
		if(s=='hab'){
			this.operationDataList[i].hab.operator=event.value
		}
		else if(s=='cps'){
			this.operationDataList[i].cps.operator=event.value
		}
		else if(s=='hc'){
			this.operationDataList[i].hc.operator=event.value
		}
		else if(s=='n'){
			this.operationDataList[i].n.operator=event.value
		}
		else if(s=='b'){
			this.operationDataList[i].b.operator=event.value
		}
		else if(s=='d'){
			this.operationDataList[i].d.operator=event.value
		}
		console.log(s,event.value,'ssssssssssssss',this.operationDataList)
	}

	addAssistant(s:string,event: any,i:number){
		if(s=='hab'){
			this.operationDataList[i].hab.assistant=event.value
		}
		else if(s=='cps'){
			this.operationDataList[i].cps.assistant=event.value
		}
		else if(s=='hc'){
			this.operationDataList[i].hc.assistant=event.value
		}
		else if(s=='n'){
			this.operationDataList[i].n.assistant=event.value
		}
		else if(s=='b'){
			this.operationDataList[i].b.assistant=event.value
		}
		else if(s=='d'){
			this.operationDataList[i].d.assistant=event.value
		}
		console.log(s,event.value,'ssssssssssssss',this.operationDataList)
	}

	addItems(){
		this.operationDataList.push({
			hab:{machine:[],operator:'',assistant:''},
			cps:{machine:[],operator:'',assistant:''},
			hc:{machine:[],operator:'',assistant:''},
			n:{machine:[],operator:'',assistant:''},
			b:{machine:[],operator:'',assistant:''},
			d:{machine:[],operator:'',assistant:''}})
		this.jobitems.push(this.fb.group({
			bom:[null,Validators.required],
			id:null,
			operation_data:{
				hab:{machine:[],operator:'',assistant:''},
				cps:{machine:[],operator:'',assistant:''},
				hc:{machine:[],operator:'',assistant:''},
				n:{machine:[],operator:'',assistant:''},
				b:{machine:[],operator:'',assistant:''},
				d:{machine:[],operator:'',assistant:''}},
			// mark:[null,Validators.required],
			number:[null,Validators.required],
			// section:[null,Validators.required],
			length:[null,Validators.required],
			width:[null,Validators.required],
			unit_weight:[null,Validators.required],
			piece_weight:[null,Validators.required],
			total_weight:[null,Validators.required],
			quantity:[null,Validators.required],
			tower_quantity:[null,Validators.required],
			operation:[null,Validators.required],
			cps:false,
			hc:false,
			n:false,
			b:false,
			hab:false,
			d:false,
			remark:[null,Validators.required],
			// jobcard:[null,Validators.required],
		}));
	}

	removeRow(i:number){
		// console.log(i)
		this.jobitems.removeAt(i);
		// if(this.jobID!=null){
		// 	this.auth.patchAPI('job-item/'+this.jobItemList[i].id+'/',{'status':'Delete'}).subscribe(res=>{
		// 		this.jobitems.removeAt(i);
		// 		console.log(res)
		// 	})
		// }else{
		// 	this.jobitems.removeAt(i);
		// }
	}

	removeEmbRow(i:number){
		if(this.embosItemList.length > 0){
			this.auth.patchAPI('embossing/'+this.embosItemList[i].id+'/',{'status':'Delete'}).subscribe(res=>{
				this.embossing.removeAt(i);
			})
		}else{
			this.embossing.removeAt(i);
		}
		// this.embossing.removeAt(i);
	}


	get f() { return this.jobForm.controls; }
	jobDetail(){
		this.spinner.show()
		this.auth.getAPI('job-card/'+this.jobID).subscribe(responce=>{
			// console.log(responce,'pppppppppppppppppppp')
			this.machines=responce.project_detail.machine_detail
			this.f.project.setValue(responce.project)
			this.f.prepared.setValue(responce.prepared)
			this.f.authorized.setValue(responce.authorized)
			
			this.f.lot.setValue(responce.lot)
			this.f.release.setValue(responce.release)
			this.jobItemList = responce.jobitems
			this.embosItemList = responce.embossings
			this.allocationItemList=responce.allocations
			this.jobitems.removeAt(0) 
			this.allocation.removeAt(0)
			this.embossing.removeAt(0) 
			for(let i = 0;i<responce.jobitems.length;i++){
				// console.log(this.jobItemList[i].machine,'mmmmmmmmm')
				this.operationDataList[i]=this.jobItemList[i].operation_data,
				this.jobitems.push(this.fb.group({
					bom:this.jobItemList[i].bom,
					id:this.jobItemList[i].id,
					operation_data:this.jobItemList[i].operation_data,
					// mark : this.jobItemList[i].mark,
					// section:this.jobItemList[i].section,
					length : this.jobItemList[i].length ,
					width : this.jobItemList[i].width, 
					unit_weight : this.jobItemList[i].unit_weight,
					piece_weight : this.jobItemList[i].piece_weight,  
					quantity : this.jobItemList[i].quantity, 
					total_weight : this.jobItemList[i].total_weight, 
					operation : this.jobItemList[i].operation, 
					tower_quantity: this.jobItemList[i].tower_quantity,
					cps:this.jobItemList[i].cps,
					hc:this.jobItemList[i].hc,
					n : this.jobItemList[i].n,
					b : this.jobItemList[i].b, 
					hab : this.jobItemList[i].hab, 
					d : this.jobItemList[i].d, 
					remark : this.jobItemList[i].remark, 
				}))
			}
			for(let j = 0;j<responce.embossings.length;j++){
				this.embossing.push(this.fb.group({
					title:responce.embossings[j].title,
					sin:responce.embossings[j].sin,
					width:responce.embossings[j].width,
					length:responce.embossings[j].length,
					pcs:responce.embossings[j].pcs,
					unit_weight:responce.embossings[j].unit_weight,
					kg:responce.embossings[j].kg,
					cl:responce.embossings[j].cl,
					// total_weight:[null,Validators.required],
					// jobcard:[null,Validators.required],
					section:responce.embossings[j].section,
				}))
			}
			console.log(responce.allocations.length,'pspsps')
			for(let k = 0;k<responce.allocations.length;k++){
				console.log(k);
				this.allocation.push(this.fb.group({
				length1:responce.allocations[k].length1,
				quantity1:responce.allocations[k].quantity1,
				length2:responce.allocations[k].length2,
				quantity2:responce.allocations[k].quantity2,
				length3:responce.allocations[k].length3,
				quantity3:responce.allocations[k].quantity3,
				length4:responce.allocations[k].length4,
				quantity4:responce.allocations[k].quantity4,
				length:responce.allocations[k].length,
				quantity:responce.allocations[k].quantity,
				section:responce.allocations[k].section,
			}))
		}
			this.spinner.hide()
		})
	}

	openSnackBar(message:string) {
		this._snackBar.open(message, '', {
			duration: 3000
		});
	}

}
