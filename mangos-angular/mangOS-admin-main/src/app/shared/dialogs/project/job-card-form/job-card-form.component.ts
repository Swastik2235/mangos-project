import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-job-card-form',
	templateUrl: './job-card-form.component.html',
	styleUrls: ['./job-card-form.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class JobCardFormComponent implements OnInit {
	
	cuttingplanimg:any;

	jobForm = this.fb.group({
		project :[null, Validators.required],
		prepared : [null,Validators.required],
		authorized : [null,Validators.required],
		cutting_plan:[null],
		lot : [null,Validators.required],
		release : [null,Validators.required],
		jobitems : this.fb.array([this.fb.group(
			{ 	bom:[null,Validators.required],
				operation_data:[null,Validators.required],
				// mark:[null,Validators.required],
				number:[null,Validators.required],
				// section:[null,Validators.required],
				length:[null,Validators.required],
				width:[null,Validators.required],
				unit_weight:[null,Validators.required],
				piece_weight:[null,Validators.required],
				weight:[null,Validators.required],
				quantity:[null,Validators.required],
				tower_quantity:[null,Validators.required],
				operation:[null,Validators.required],
				n:false,
				b:false,
				cps:false,
				hc:false,
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
	userList:any=[];
	projectList:any=[];
	sectionList:any=[];
	projectName:any;
	towerList:any=[]
	nextPage:any = '';
	selectedP:any;
	jobItemList:any=[];
	bomList:any=[];
	sectionListt:any=[];
	eventM:any=[];
	loginUser:any;
	operationDataList:any=[{
		hab:{machine:[],operator:'',assistant:''},
		cps:{machine:[],operator:'',assistant:''},
		hc:{machine:[],operator:'',assistant:''},
		n:{machine:[],operator:'',assistant:''},
		b:{machine:[],operator:'',assistant:''},
		d:{machine:[],operator:'',assistant:''}}]
	machines:any=[];
	constructor(private location : Location, private fb: FormBuilder,public dialogRef: MatDialogRef<JobCardFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService,private router : Router) {
		this.projectList = data['project'];
		console.log(this.projectList, 'project listtttt')
		this.selectedP = data['selectedP'];
		this.bomList = data['bomlist'];
		console.log(this.bomList, 'BOM listtttt')
		for (var val of this.bomList)
		{
			this.sectionListt.push(val['section_detail'])
		}
		var k='';
			for (var val of this.sectionListt){
				if (k!=val['title']){
					this.sectionList.push(val)
					k=val['title']
				}
			}
		// this.sectionList = data['bomList'];
		const expected = new Set();
		this.sectionList = this.sectionListt.filter((item:any) => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
		
		this.addBomList(this.bomList);
		if(this.selectedP != null && this.projectList){
			let sProject = this.projectList.filter((project:any) => project.slug == this.selectedP)
			this.f.project.setValue(sProject[0].id)
			this.machines=sProject[0].machine_detail
			console.log(this.machines,'sssssssssssss')
		}
		this.loginUser = JSON.parse(localStorage.getItem('userdata') || '')
		if(this.loginUser){
			this.f.prepared.setValue(this.loginUser.id)
		}
	}

	ngOnInit(): void {
		this.auth.getAPI('user/').subscribe(result=>{
			this.userList = result.results
		})
	}

	addBomList(bomlist:any){
		this.jobitems.removeAt(0)
		for(let i = 0;i<bomlist.length;i++){
			this.operationDataList[i]={
				hab:{machine:[],operator:'',assistant:''},
				cps:{machine:[],operator:'',assistant:''},
				hc:{machine:[],operator:'',assistant:''},
				n:{machine:[],operator:'',assistant:''},
				b:{machine:[],operator:'',assistant:''},
				d:{machine:[],operator:'',assistant:''}}
			this.jobitems.push(this.fb.group({
				bom : bomlist[i].id,
				operation_data : {},
				// mark : bomlist[i].mark,
				number : bomlist[i].number,
				// section:bomlist[i].section,
				length : bomlist[i].length ,
				width : bomlist[i].width, 
				unit_weight : bomlist[i].unit_weight,
				piece_weight : bomlist[i].piece_weight,
				weight : bomlist[i].weight, 
				operation : bomlist[i].operation, 
				quantity : bomlist[i].quantity, 
				// tower : bomlist[i].tower, 
				tower_quantity : bomlist[i].tower_quantity, 
				n : false,
				b : false, 
				cps : false, 
				hc : false, 
				hab : false, 
				d :false, 
				remark : bomlist[i].remark, 
			}))
		}
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
			bom :[null,Validators.required],
			operation_data :{},
			// mark:[null,Validators.required],
			number:[null,Validators.required],
			// section:[null,Validators.required],
			length:[null,Validators.required],
			width:[null,Validators.required],
			unit_weight:[null,Validators.required],
			piece_weight:[null,Validators.required],
			weight:[null,Validators.required],
			operation:[null,Validators.required],
			quantity:[null,Validators.required],
			tower:[null,Validators.required],
			n:false,
			b:false,
			cps:false,
			hc:false,
			hab:false,
			d:false,
			remark:[null,Validators.required],
			jobcard:[null,Validators.required],
		}));
	}

	addEmbItems(){
		this.embossing.push(this.fb.group({
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
		}));
	}

	op_checked(str:string,i:number){
		if(str=='hab'){
			console.log(this.jobitems.value[i].hab,'b')
			this.jobitems.value[i].hab = true
			console.log(this.jobitems.value[i].hab,'a')
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

	removeRow(i:number){
		if(this.jobItemList.length > 0){
			this.auth.patchAPI('job-item/'+this.jobItemList[i].id+'/',{'status':'Delete'}).subscribe(res=>{
				this.jobitems.removeAt(i);
				this.operationDataList.removeAt(i);
			})
		}else{
			this.jobitems.removeAt(i);
			this.operationDataList.removeAt(i);
		}
	}

	removeEmbRow(i:number){
		// if(this.jobItemList.length > 0){
		// 	this.auth.patchAPI('embossing/'+this.jobItemList[i].id+'/',{'status':'Delete'}).subscribe(res=>{
		// 		this.embossing.removeAt(i);
		// 	})
		// }else{
		// 	this.embossing.removeAt(i);
		// }
		this.embossing.removeAt(i);
	}

	get f() { return this.jobForm.controls; }
	// jobDetail(){
	// 	this.auth.getAPI('job-card/'+this.jobID).subscribe(responce=>{
	// 		console.log(responce,'rrrrrrrr')
	// 		this.f.project.setValue(responce.project)
	// 		this.f.prepared.setValue(responce.tower)
	// 		this.f.authorized.setValue(responce.title)
	// 		this.f.note.setValue(responce.note)
	// 		this.f.spec.setValue(responce.spec)
	// 		this.f.lot.setValue(responce.lot)
	// 		this.f.order.setValue(responce.order)
	// 		this.jobItemList = responce.jobitems
	// 		this.jobitems.removeAt(0) 
	// 		for(let i = 0;i<responce.jobitems.length;i++){
	// 			console.log('hello')
	// 			this.jobitems.push(this.fb.group({
	// 				mark : this.jobItemList[i].mark,
	// 				section:this.jobItemList[i].section,
	// 				length : this.jobItemList[i].length ,
	// 				width : this.jobItemList[i].width, 
	// 				unit : this.jobItemList[i].unit,
	// 				pc : this.jobItemList[i].pc,  
	// 				qty : this.jobItemList[i].qty, 
	// 				weight : this.jobItemList[i].weight, 
	// 				operation : this.jobItemList[i].operation, 
	// 				n : this.jobItemList[i].n,
	// 				b : this.jobItemList[i].b, 
	// 				hab : this.jobItemList[i].hab, 
	// 				d : this.jobItemList[i].d, 
	// 				remark : this.jobItemList[i].remark, 
	// 			}))
	// 		}
	// 	})
	// }

	addJob(){
		// console.log(this.operationDataList,'vsvsvs')
		for(let i in this.jobForm.value.jobitems){
			this.jobForm.value.jobitems[i].operation_data=this.operationDataList[i]
		}
		if (this.jobForm.invalid) {
			console.log(this.jobForm,'form invaliddddd')
	      	return;
	    }else{
			console.log(this.jobForm.value,'form validdddd')
			this.f.release.setValue(formatDate(this.f.release.value,'YYYY-MM-dd','en'));
			console.log(this.jobForm.value,'ssssssssssssss')
			this.auth.postAPI('job-card/',this.jobForm.value).subscribe(res=>{
			console.log(this.jobForm.value,'ssssssssssssss')
			// this.router.navigate(['project/job-card'])
				this.auth.patchForm('job-cardd/'+res.id+'/',{cutting_plan:this.cuttingplanimg}).subscribe(result=>{})
				this.dialogRef.close()
				
				// console.log(res)
			})
		}
	}
	fileChangeEvent(event:any){
		if (event.target.files.length > 0) {
			// event.target.files[0];
			this.cuttingplanimg=event.target.files[0];
			// this.f.cutting_plan.setValue(event.target.files[0])
		}
	}

}
