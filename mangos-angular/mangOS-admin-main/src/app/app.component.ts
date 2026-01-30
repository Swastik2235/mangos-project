import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	title = 'mangosAdmin';
	logged_in = false;

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
		constructor(private breakpointObserver: BreakpointObserver,private router:Router) {
			// this.router.events.subscribe(data=>{
			//   console.log(this.router.url.includes('/forgot-password'),'fffffffffffff')
			//   if(this.router.url === '/login' || this.router.url === '/forgot-password' ||  this.router.url.includes('/forgot-password')){
			//     this.logged_in = false;
			//   }else{
			//     this.logged_in = true;
			//   }
			// })
			//console.log(localStorage.getItem('tm'),'777777777777')
		}

		// receiveMessage($event:any) {
		//   //this.logged_in = $event
		//   console.log($event)
		//   console.log('11111111111')
		
}
