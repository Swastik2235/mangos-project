import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-tank-data-form',
  templateUrl: './tank-data-form.component.html',
  styleUrls: ['./tank-data-form.component.scss']
})
export class TankDataFormComponent implements OnInit {

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<TankDataFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthenticationService) { }
  tankDataForm = this.fb.group({
    tank :[null,Validators.required],
    slots :[null],
    strength :[null],
    temperature :[null],
    acidc :[null],
    ironc :[null],
    density :[null],
    ph :[null],
    strengthsdc :[null],
    zinc_ash :[null],
  });
  tankList:any
  apiUrl:any

  ngOnInit(): void {
    this.auth.getAPI('tank/').subscribe((responce) => {
      this.tankList = responce.results;
      console.log(this.tankList)
      if (responce.next != null) {
        this.apiUrl = responce.next.split('?')[1];
      }})
    if(this.data.myData){
      let data = this.data.myData
      this.tankDataForm.controls['tank'].setValue(data.tank);
      this.tankDataForm.controls['slots'].setValue(data.slots);
      this.tankDataForm.controls['strength'].setValue(data.strength);
      this.tankDataForm.controls['temperature'].setValue(data.temperature);
      this.tankDataForm.controls['acidc'].setValue(data.acidc);
      this.tankDataForm.controls['ironc'].setValue(data.ironc);
      this.tankDataForm.controls['density'].setValue(data.density);
      this.tankDataForm.controls['ph'].setValue(data.ph);
      this.tankDataForm.controls['strengthsdc'].setValue(data.strengthsdc);
      this.tankDataForm.controls['zinc_ash'].setValue(data.zinc_ash);
    }
  }

  closeDialog(){
		this.dialogRef.close()
	}
  addData(){
    if(this.data.title == "New Tank Data"){
			this.auth.postAPI('tank-data/',this.tankDataForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})
		}
    else if(this.data.title == "Edit Tank Data"){
			this.auth.patchAPI('tank-data/'+this.data.myData.id+'/',this.tankDataForm.value).subscribe(res=>{
				this.dialogRef.close(res)
			})}
    }

}