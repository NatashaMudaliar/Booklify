import { Injectable, inject } from '@angular/core'; import { HttpClient } from '@angular/common/http'; import { BehaviorSubject, tap } from 'rxjs'; import { User } from './models';
@Injectable({providedIn:'root'}) export class AuthService {
 private http=inject(HttpClient); private key='booklify_user'; private userSubject=new BehaviorSubject<User|null>(this.read()); user$=this.userSubject.asObservable();
 private read(){try{return JSON.parse(localStorage.getItem(this.key)||'null') as User|null}catch{return null}}
 login(data:{email:string;password:string}){return this.http.post<User>('/api/auth/login',data).pipe(tap(u=>this.set(u)));}
 register(data:{name:string;email:string;password:string}){return this.http.post<User>('/api/auth/register',data).pipe(tap(u=>this.set(u)));}
 private set(u:User){localStorage.setItem(this.key,JSON.stringify(u));localStorage.setItem('booklify_token',u.token);this.userSubject.next(u)}
 logout(){localStorage.removeItem(this.key);localStorage.removeItem('booklify_token');this.userSubject.next(null)}
 get user(){return this.userSubject.value} get isLoggedIn(){return !!this.user}
}
