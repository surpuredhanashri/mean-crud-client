import { LocalstorageService } from './localstorage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Users } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8080/users/register';
  baselogin = 'http://localhost:8080/users/login';

  constructor(private http: HttpClient, private localstorageService:LocalstorageService,private router: Router) {}

  register(user: Users): Observable<Users> {
    return this.http.post<Users>(this.baseUrl, user);
  }

  login(name: string, password: string): Observable<Users> {
    return this.http.post<Users>(this.baselogin, { name, password });
  }


  logOut(){
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }


}
