import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationBarComponent } from '../shared/navbar/notification-bar/notification-bar.component'; 
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
	selector: 'app-core',
	templateUrl: './core.component.html',
	styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
	.pipe(
		map(result => result.matches),
		shareReplay()
	);
	notificationDivShow = false;
	panelOpenState = false;
	checkedIn:any;
	tokenn:any;
	loginUser:any;
	constructor(private auth:AuthenticationService,private breakpointObserver: BreakpointObserver, public router:Router,public _router:ActivatedRoute){
		this.tokenn = localStorage.getItem('token')
		if(this.tokenn!=null){
			this.checkedIn = JSON.parse(localStorage.getItem('userdata')|| '').last_login;
		}
		this.loginUser = this.auth.profile();
		console.log(this.loginUser, 'loginnnnnnn');
		
		
	}

	ngOnInit(): void {
		if(this.tokenn!=null){
			var tm = JSON.parse(localStorage.getItem('tm') || '' )
			console.log(tm,'mmmmmmmmmm')
			var c_time = new Date().getTime()
			console.log(c_time > tm)
			if(c_time > tm){
				localStorage.clear();
			}
		}
	}


	logout(){
		localStorage.clear();
		this.router.navigate(['/login']);
	}

	openBar(){
		this.notificationDivShow = !this.notificationDivShow
	}

}
