// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//     // domain = '127.0.0.1:8000';
//     domain = '15.207.89.112:8001';
//     // domain = 'mangos.com';
//     baseUrl: string = 'http://'+this.domain;
//     // baseUrl: string = 'https://'+this.domain;
//     apiUrl: string = this.baseUrl+'/mosapi/v1/';

//     socketUrl: string = 'ws://'+this.domain;
//     // socketUrl: string = 'wss://'+this.domain;
//     httpOptions: any;

//     constructor(private http: HttpClient, private router: Router){}

//     getAPI(url:any): Observable<any> {
//         this.httpOptions = {
//           headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//         };
//         if (localStorage.getItem("token")) {
//             this.httpOptions = {
//                 headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
//             };
//         }
//         var response = this.http.get(this.apiUrl+url, this.httpOptions);
//         response.subscribe(result => {
//             // console.log(result);
//         },error => {
//             if (error.status == 401) {
//                 this.router.navigate(['login']);
//                 // window.location.href = this.baseUrl;
//             }
//         })
//         return response;
//     }

//     postAPI(url:any, params:any): Observable<any> {
//         this.httpOptions = {
//           headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//         };
//         if (localStorage.getItem("token")) {
//             this.httpOptions = {
//                 headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
//             };
//         }
//         return this.http.post(this.apiUrl+url, params, this.httpOptions);
//     }

//     postJson(url:any, params:any) {
//         this.httpOptions = {
//           headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//         };
//         if (localStorage.getItem("token")) {
//             this.httpOptions = {
//                 headers: new HttpHeaders({'Authorization': 'token '+localStorage.getItem("token") })
//             };
//         }
//         var formData: any = new FormData();
//         for (var i = 0; i < params.length; ++i) {
//             var key = Object.keys(params[i])[0];
//             var prm = params[i][0];
//             formData.append(key, JSON.stringify(params[i][key]) );
//         }
//         // formData.append("id", JSON.stringify(array));
//         return this.http.post(this.apiUrl+url, formData, this.httpOptions);
//     }

//     postForm(url:any, params:any) {
//         this.httpOptions = {
//           headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//         };
//         if (localStorage.getItem("token")) {
//             this.httpOptions = {
//                 headers: new HttpHeaders({'Authorization': 'token '+localStorage.getItem("token") })
//             };
//         }
//         var formData: any = new FormData();
//         for (var i = 0; i < params.length; ++i) {
//             var key = Object.keys(params[i])[0];
//             var prm = params[i][0];
//             formData.append(key, params[i][key] );
//         }
//         return this.http.post(this.apiUrl+url, formData, this.httpOptions);
//     }

//     patchForm(url:any, params:any) {
//         this.httpOptions = {
//           headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
//         };
//         if (localStorage.getItem("token")) {
//             this.httpOptions = {
//                 headers: new HttpHeaders({'Authorization': 'token '+localStorage.getItem("token") })
//             };
//         }
//         var formData: any = new FormData();
//         //console.log(Object.keys(params),'pppppppppppp')
//         //console.log(params,'qqqqqqqqq')
//         var keys =  Object.keys(params)
//         for (var i = 0; i < keys.length; ++i) {
//             var keys = Object.keys(params);
//             var key = keys[i]
//             //console.log(key,'kkkkkkk')
//             var prm = params[key];
//             //console.log(prm,'parammmmmmmmmm')
//             formData.append(key, prm );
//         }
//         //console.log(formData.get('image'),'88888888888888')
//         return this.http.patch(this.apiUrl+url, formData, this.httpOptions);
//     }

//     putAPI(url:any, params:any): Observable<any> {
//         this.httpOptions = {
//           headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//         };
//         if (localStorage.getItem("token")) {
//             this.httpOptions = {
//                 headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
//             };
//         }
//         return this.http.put(this.apiUrl+url, params, this.httpOptions);
//     }

//     patchAPI(url:any, params:any): Observable<any> {
//         this.httpOptions = {
//           headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//         };
//         if (localStorage.getItem("token")) {
//             this.httpOptions = {
//                 headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
//             };
//         }
//         return this.http.patch(this.apiUrl+url, params, this.httpOptions);
//     }

//     deleteAPI(url:any): Observable<any> {
//         this.httpOptions = {
//           headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//         };
//         if (localStorage.getItem("token")) {
//             this.httpOptions = {
//                 headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token '+localStorage.getItem("token") })
//             };
//         }
//         return this.http.delete(this.apiUrl+url, this.httpOptions);
//     }
// }
