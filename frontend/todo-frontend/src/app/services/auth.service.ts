import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl=environment.apiUrl;
  private currentUserSubject=new BehaviorSubject<User|null>(null);
  public currentUser$=this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
   }

   private loadUserFromStorage():void{
    const userData=localStorage.getItem('user');
    const token=this.getToken();

    if(userData && token){
      this.currentUserSubject.next(JSON.parse(userData));
    }
   }

   getToken():string|null{
    return localStorage.getItem('token');
   }

   login(credentials:LoginRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`,credentials)
    .pipe(
      tap( response =>{
        this.storeAuthData(response);
        this.loadUserFromToken(response.token);
      })
    );
   }

   register(userData:RegisterRequest):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`,userData);
   }

   logout():void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
   }

   isLoggedIn():boolean{
    return !!this.getToken();
   }

   private storeAuthData(response:AuthResponse):void{
    localStorage.setItem('token',response.token);
    localStorage.setItem('user',JSON.stringify({
      username:response.username,
      email:response.email
    }));
   }

   private loadUserFromToken(token:string):void{
    const userData = localStorage.getItem('user');
    if(userData){
      this.currentUserSubject.next(JSON.parse(userData));
    }

   }





}
