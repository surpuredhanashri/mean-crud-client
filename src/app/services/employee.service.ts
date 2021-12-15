import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Employee } from '../models/employee';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/employees';

  get(){
    return this.http.get<any>(this.baseUrl).pipe(map((res:any)=>{
      return res;
      }));
  }

  post(data:any){
    return this.http.post(this.baseUrl, data).pipe(map((res:any)=>{
      return res;
      }));
  }
  delete(id:number){
    return this.http.delete<any>(this.baseUrl + '/' + id).pipe(map((res:any)=>{
      return res;
      }));
  }

  update(data:any,id: number){
    return this.http.put<any>(this.baseUrl + '/' + id, data).pipe(map((res:any)=>{
      return res;
      })); 
  }
}
