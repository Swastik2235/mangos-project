import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

	taskForm = this.fb.group({
		project:null,
		title :[null,Validators.required],
		content :[null, Validators.required],
		department:[null, Validators.required],
		start:[null, Validators.required],
		finish:[null, Validators.required],
		parent:null

	});
	department = ['Account','Dispatch','Galva','Planning','Purchase','Quality','Raw']

	constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<TaskFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) {
		this.f.project.setValue(this.data.projectId)
		//console.log(this.f.id.value)
	}
	get f() { return this.taskForm.controls; }
	ngOnInit(): void {
		console.log(this.data)
		if(this.data.taskId){
			this.f.parent.setValue(this.data.taskId)
			console.log(this.data.taskId)
		}
	}

	addTask(){
		console.log(this.taskForm.value,'taskkkkkkk')
		this.f.start.setValue(formatDate(this.f.start.value,'YYYY-MM-dd','en'));
		this.f.finish.setValue(formatDate(this.f.finish.value,'YYYY-MM-dd','en'));
		this.auth.postAPI('task/',this.taskForm.value).subscribe(data=>{
			console.log(data)
			this.dialogRef.close(data)
		})
	}

	closeDialog(){
		this.dialogRef.close()
	}

}
