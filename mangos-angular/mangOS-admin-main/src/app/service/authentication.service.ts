import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    // domain = '127.0.0.1:8000';
    // domain = '3.6.226.237:8001';
    // domain = 'api.mangos.work';
    domain = 'mangos-api.onrender.com';
    // domain = 'mangos.stpayment.in';
    // baseUrl: string = 'http://'+this.domain;
    baseUrl: string = 'https://'+this.domain;
    // apiUrl: string = this.baseUrl+'/mosapi/v1/';
    apiUrl: string = this.baseUrl+'/';

    socketUrl: string = 'ws://'+this.domain;
    // socketUrl: string = 'wss://'+this.domain;
    httpOptions: any;

    constructor(private http: HttpClient, private router: Router,private spinner: NgxSpinnerService){}

    profile(){
        return JSON.parse(localStorage.getItem('userdata') || '{}');
    }

    getAPI(url:any): Observable<any> {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        // var response = this.http.get(this.apiUrl+url, this.httpOptions);
        // response.subscribe(result => {
        //     // console.log(result);
        // },error => {
        //     if (error.status == 401) {
        //         this.router.navigate(['login']);
        //         // window.location.href = this.baseUrl;
        //     }
        // })
        // return response;
        var response = this.http.get(this.apiUrl+url, this.httpOptions).pipe(map(data => {
					this.spinner.hide();
					return data;
				})
			).pipe(catchError(error => {
			      	this.spinner.hide();
					if (error.status == 401) {
				        localStorage.clear();
				        this.router.navigate(['login']);
				    }
			      return throwError(error);;
			    })
			)
		return response;
    }

    postAPI(url:any, params:any): Observable<any> {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        return this.http.post(this.apiUrl+url, params, this.httpOptions);
    }

    postJson(url:any, params:any) {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        var formData: any = new FormData();
        for (var i = 0; i < params.length; ++i) {
            var key = Object.keys(params[i])[0];
            var prm = params[i][0];
            formData.append(key, JSON.stringify(params[i][key]) );
        }
        // formData.append("id", JSON.stringify(array));
        return this.http.post(this.apiUrl+url, formData, this.httpOptions);
    }

    postForm(url:any, params:any) {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        var formData: any = new FormData();
        var keys =  Object.keys(params)
        for (var i = 0; i < keys.length; ++i) {
            var keys = Object.keys(params);
            var key = keys[i]
            var prm = params[key];
            formData.append(key, prm );
        }
        
        // for (var i = 0; i < params.length; i++) {
            

        //     var key = Object.keys(params[i])[0];
        //     var prm = params[i][0];
        //     formData.append(key, params[i][key]);
        // }
       
        return this.http.post(this.apiUrl+url, formData, this.httpOptions);
    }
    postForm2(url:any, params:any) {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        var formData: any = new FormData();
        var keys =  Object.keys(params)
        // for (var i = 0; i < keys.length; ++i) {
        //     var keys = Object.keys(params);
        //     var key = keys[i]
        //     var prm = params[key];
        //     formData.append(key, prm );
        // }
        
        for (var i = 0; i < params.length; i++) {
            

            var key = Object.keys(params[i])[0];
            var prm = params[i][0];
            formData.append(key, params[i][key]);
        }
       
        return this.http.post(this.apiUrl+url, formData, this.httpOptions);
    }

    patchForm(url:any, params:any) {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        var formData: any = new FormData();
        var keys =  Object.keys(params)
        for (var i = 0; i < keys.length; ++i) {
            var keys = Object.keys(params);
            var key = keys[i]
            var prm = params[key];
            formData.append(key, prm );
        }
        // for (var i = 0; i < params.length; ++i) {
        //     var key = Object.keys(params[i])[0];
        //     var prm = params[i][0];
        //     formData.append(key, params[i][key]);
        // }
        return this.http.patch(this.apiUrl+url, formData, this.httpOptions);
    }
    patchForm2(url:any, params:any) {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        var formData: any = new FormData();
        var keys =  Object.keys(params)
        // for (var i = 0; i < keys.length; ++i) {
        //     var keys = Object.keys(params);
        //     var key = keys[i]
        //     var prm = params[key];
        //     formData.append(key, prm );
        // }
        for (var i = 0; i < params.length; ++i) {
            var key = Object.keys(params[i])[0];
            var prm = params[i][0];
            formData.append(key, params[i][key]);
        }
        return this.http.patch(this.apiUrl+url, formData, this.httpOptions);
    }

    putAPI(url:any, params:any): Observable<any> {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        return this.http.put(this.apiUrl+url, params, this.httpOptions);
    }

    patchAPI(url:any, params:any): Observable<any> {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        return this.http.patch(this.apiUrl+url, params, this.httpOptions);
    }

    deleteAPI(url:any): Observable<any> {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (localStorage.getItem("token")) {
            this.httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
            };
        }
        return this.http.delete(this.apiUrl+url, this.httpOptions);
    }

    testing(url:any){

    }
    download(url: string): Observable<Blob> {
	    return this.http.get(url, {
	      responseType: 'blob'
	    })
	}
}
