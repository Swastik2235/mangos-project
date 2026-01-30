import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-galva-job-card-detail',
  templateUrl: './galva-job-card-detail.component.html',
  styleUrls: ['./galva-job-card-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GalvaJobCardDetailComponent implements OnInit {
  sJobCardData: any;
  timedict: any;
  now: any;
  zincdata: any = [];
  tanks: any = {
    Jig: { title: '' },
    Degreasing: { title: '' },
    Pickling: { title: '' },
    Rinsing: { title: '' },
    Flux: { title: '' },
    Preheater: { title: '' },
    Zincbath: { title: '' },
    Quenching: { title: '' },
    Dichromate: { title: '' },
  };
  unittotal: number = 0;
  qtytotal: number = 0;
  weighttotal: number = 0;
  totalEmboPcs: number = 0;
  totalWtInKgs: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<GalvaJobCardDetailComponent>,
    private auth: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    this.sJobCardData = data.jcdata;
    console.log(this.sJobCardData.galvajobitems);
    for (let i of this.sJobCardData.galvajobitems) {
      this.weighttotal=this.weighttotal+i.weight
      this.zincdata.push({
        min_coating: i.min_coating,
        max_coating: i.max_coating,
        avg_coating: i.avg_coating,
        zinc_consumption_per: i.zinc_consumption_per,
        zinc_theoratical: i.zinc_theoratical,
        zinc_excess: i.zinc_excess,
        zinc_excess_p: i.zinc_excess_p,
        zinc_consumption_act: i.zinc_consumption_act,
        zinc_consumption_t: i.zinc_consumption_t,
        difference_zinc_cons: i.difference_zinc_cons,
      });
    }
    console.log(this.sJobCardData, 'lllllllllllllll');
    for (let s of this.sJobCardData.tank_detail) {
      if (s.type == 'Jig') {
        this.tanks.Jig = s;
      } else if (s.type == 'Degreasing') {
        this.tanks.Degreasing = s;
      } else if (s.type == 'Pickling') {
        this.tanks.Pickling = s;
      } else if (s.type == 'Rinsing') {
        this.tanks.Rinsing = s;
      } else if (s.type == 'Flux') {
        this.tanks.Flux = s;
      } else if (s.type == 'Preheater') {
        this.tanks.Preheater = s;
      } else if (s.type == 'Zincbath') {
        this.tanks.Zincbath = s;
      } else if (s.type == 'Quenching') {
        this.tanks.Quenching = s;
      } else if (s.type == 'Dichromate') {
        this.tanks.Dichromate = s;
      }
    }
  }
  ngOnInit(): void {}
  timein(s: any) {
    this.now = new Date().toString().split(' ')[4];
    if (s == 'jig_in') {
      this.timedict = { jig_in: this.now };
    } else if (s == 'jig_out') {
      this.timedict = { jig_out: this.now };
    } else if (s == 'degreasing_in') {
      this.timedict = { degreasing_in: this.now };
    } else if (s == 'degreasing_out') {
      this.timedict = { degreasing_out: this.now };
    } else if (s == 'pickling_in') {
      this.timedict = { pickling_in: this.now };
    } else if (s == 'pickling_out') {
      this.timedict = { pickling_out: this.now };
    } else if (s == 'rinsing_in') {
      this.timedict = { rinsing_in: this.now };
    } else if (s == 'rinsing_out') {
      this.timedict = { rinsing_out: this.now };
    } else if (s == 'flux_in') {
      this.timedict = { flux_in: this.now };
    } else if (s == 'flux_out') {
      this.timedict = { flux_out: this.now };
    } else if (s == 'preheater_in') {
      this.timedict = { preheater_in: this.now };
    } else if (s == 'preheater_out') {
      this.timedict = { preheater_out: this.now };
    } else if (s == 'zincbath_in') {
      this.timedict = { zincbath_in: this.now };
    } else if (s == 'zincbath_out') {
      this.timedict = { zincbath_out: this.now };
    } else if (s == 'quenching_in') {
      this.timedict = { quenching_in: this.now };
    } else if (s == 'quenching_out') {
      this.timedict = { quenching_out: this.now };
    } else if (s == 'dichromate_in') {
      this.timedict = { dichromate_in: this.now };
    } else if (s == 'dichromate_out') {
      this.timedict = { dichromate_out: this.now };
    } else if (s == 'filing_in') {
      this.timedict = { filing_in: this.now };
    } else if (s == 'filing_out') {
      this.timedict = { filing_out: this.now };
    }
    this.auth
      .patchAPI('galva-job-card/' + this.sJobCardData.id + '/', this.timedict)
      .subscribe((res) => {
        console.log(res);
        this.sJobCardData = res;
      });
    console.log(this.now, 'ttt', this.sJobCardData.id);
  }
  setmin_coating(event: any, i: number) {
    this.zincdata[i].min_coating = event.target.value;
    console.log(event.target.value);
    this.zincdata[i].avg_coating = (parseFloat(this.zincdata[i].max_coating)+parseFloat(this.zincdata[i].min_coating))/2
    this.sJobCardData.galvajobitems[i].avg_coating=this.zincdata[i].avg_coating
    this.zincdata[i].zinc_consumption_per = (parseFloat(this.zincdata[i].avg_coating)*2)/(parseFloat(this.sJobCardData.galvajobitems[i].thickness)*10)
    this.sJobCardData.galvajobitems[i].zinc_consumption_per=this.zincdata[i].zinc_consumption_per
    this.zincdata[i].zinc_theoratical = (parseFloat(this.sJobCardData.galvajobitems[i].min_coating_required)*2)/(parseFloat(this.sJobCardData.galvajobitems[i].thickness)*10)
    this.sJobCardData.galvajobitems[i].zinc_theoratical=this.zincdata[i].zinc_theoratical
    this.zincdata[i].zinc_excess = (parseFloat(this.zincdata[i].zinc_consumption_per)-parseFloat(this.zincdata[i].zinc_theoratical))
    this.sJobCardData.galvajobitems[i].zinc_excess=this.zincdata[i].zinc_excess
    this.zincdata[i].zinc_excess_p=parseFloat(this.zincdata[i].zinc_excess)/parseFloat(this.zincdata[i].zinc_consumption_per)
    this.sJobCardData.galvajobitems[i].zinc_excess_p=this.zincdata[i].zinc_excess_p

    this.zincdata[i].difference_zinc_cons = (parseFloat(this.zincdata[i].zinc_consumption_act)-parseFloat(this.zincdata[i].zinc_consumption_t))
    this.sJobCardData.galvajobitems[i].difference_zinc_cons=this.zincdata[i].difference_zinc_cons
  }
  setmax_coating(event: any, i: number) {
    this.zincdata[i].max_coating = event.target.value;
    console.log(event.target.value);
    this.zincdata[i].avg_coating = (parseFloat(this.zincdata[i].max_coating)+parseFloat(this.zincdata[i].min_coating))/2
    this.sJobCardData.galvajobitems[i].avg_coating=this.zincdata[i].avg_coating
    this.zincdata[i].zinc_consumption_per = (parseFloat(this.zincdata[i].avg_coating)*2)/(parseFloat(this.sJobCardData.galvajobitems[i].thickness)*10)
    this.sJobCardData.galvajobitems[i].zinc_consumption_per=this.zincdata[i].zinc_consumption_per
    this.zincdata[i].zinc_theoratical = (parseFloat(this.sJobCardData.galvajobitems[i].min_coating_required)*2)/(parseFloat(this.sJobCardData.galvajobitems[i].thickness)*10)
    this.sJobCardData.galvajobitems[i].zinc_theoratical=this.zincdata[i].zinc_theoratical
    this.zincdata[i].zinc_excess = (parseFloat(this.zincdata[i].zinc_consumption_per)-parseFloat(this.zincdata[i].zinc_theoratical))
    this.sJobCardData.galvajobitems[i].zinc_excess=this.zincdata[i].zinc_excess
    this.zincdata[i].zinc_excess_p=parseFloat(this.zincdata[i].zinc_excess)/parseFloat(this.zincdata[i].zinc_consumption_per)
    this.sJobCardData.galvajobitems[i].zinc_excess_p=this.zincdata[i].zinc_excess_p
    this.zincdata[i].zinc_consumption_t = (parseFloat(this.zincdata[i].zinc_theoratical)*parseFloat(this.sJobCardData.galvajobitems[i].weight))/100
    this.sJobCardData.galvajobitems[i].zinc_consumption_t=this.zincdata[i].zinc_consumption_t
    this.zincdata[i].zinc_consumption_act = (parseFloat(this.zincdata[i].zinc_consumption_per)*parseFloat(this.sJobCardData.galvajobitems[i].weight))/100
    this.sJobCardData.galvajobitems[i].zinc_consumption_act=this.zincdata[i].zinc_consumption_act
    this.zincdata[i].difference_zinc_cons = (parseFloat(this.zincdata[i].zinc_consumption_act)-parseFloat(this.zincdata[i].zinc_consumption_t))
    this.sJobCardData.galvajobitems[i].difference_zinc_cons=this.zincdata[i].difference_zinc_cons
  }
  setavg_coating(event: any, i: number) {
  //   this.zincdata[i].avg_coating = event.target.value;
  //   console.log(event.target.value);
  }
  setzinc_consumption_per(event: any, i: number) {
  //   this.zincdata[i].zinc_consumption_per = event.target.value;
  //   console.log(event.target.value);
  //   this.zincdata[i].zinc_excess = (parseFloat(this.zincdata[i].zinc_consumption_per)-parseFloat(this.zincdata[i].zinc_theoratical))
  //   this.sJobCardData.galvajobitems[i].zinc_excess=this.zincdata[i].zinc_excess
  //   this.zincdata[i].zinc_excess_p=parseFloat(this.zincdata[i].zinc_excess)/parseFloat(this.zincdata[i].zinc_consumption_per)
  //   this.sJobCardData.galvajobitems[i].zinc_excess_p=this.zincdata[i].zinc_excess_p
  }
  setzinc_theoratical(event: any, i: number) {
  //   this.zincdata[i].zinc_theoratical = event.target.value;
  //   console.log(event.target.value);
  //   this.zincdata[i].zinc_excess = (parseFloat(this.zincdata[i].zinc_consumption_per)-parseFloat(this.zincdata[i].zinc_theoratical))
  //   this.sJobCardData.galvajobitems[i].zinc_excess=this.zincdata[i].zinc_excess
  //   this.zincdata[i].zinc_excess_p=parseFloat(this.zincdata[i].zinc_excess)/parseFloat(this.zincdata[i].zinc_consumption_per)
  //   this.sJobCardData.galvajobitems[i].zinc_excess_p=this.zincdata[i].zinc_excess_p
  }
  setzinc_excess(event: any, i: number) {
  //   this.zincdata[i].zinc_excess = event.target.value;
  //   console.log(event.target.value);
  }
  setzinc_excess_p(event: any, i: number) {
  //   this.zincdata[i].zinc_excess_p = event.target.value;
  //   console.log(event.target.value);
  }
  setzinc_consumption_t(event: any, i: number) {
    this.zincdata[i].zinc_consumption_t = event.target.value;
    console.log(event.target.value);
    this.zincdata[i].difference_zinc_cons = (parseFloat(this.zincdata[i].zinc_consumption_act)-parseFloat(this.zincdata[i].zinc_consumption_t))
    this.sJobCardData.galvajobitems[i].difference_zinc_cons=this.zincdata[i].difference_zinc_cons
  }
  setzinc_consumption_act(event: any, i: number) {
    this.zincdata[i].zinc_consumption_act = event.target.value;
    console.log(event.target.value);
    this.zincdata[i].difference_zinc_cons = (parseFloat(this.zincdata[i].zinc_consumption_act)-parseFloat(this.zincdata[i].zinc_consumption_t))
    this.sJobCardData.galvajobitems[i].difference_zinc_cons=this.zincdata[i].difference_zinc_cons
  }
  setdifference_zinc_cons(event: any, i: number) {
  //   this.zincdata[i].difference_zinc_cons = event.target.value;
  //   console.log(event.target.value);
  }
  savezinc(item: any, i: number) {
    console.log(item.id, this.zincdata[i]);
    this.auth.patchAPI('galva-job-item/'+item.id+'/',this.zincdata[i]).subscribe((res)=>{
      this.sJobCardData.galvajobitems[i]=res
      this.openSnackBar('zinc entries updated')
    })
  }
  openSnackBar(message:string) {
		this._snackBar.open(message, '', {
			duration: 3000
		});
	}
}
