import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.prod';
import { HttpClient } from '@angular/common/http';
import { IJobForm } from '../interfaces/jobForm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  submitForm(data: IJobForm,endPoint:any): Observable<IJobForm> {
  return this.http.post<IJobForm>(this.apiUrl+endPoint, data);
}

addUser(data:any):Observable<any>{
  let endPoint = '/signup/user'
  return this.http.post(this.apiUrl+endPoint,data)
}

generateOtp(phoneNumber:string):Observable<any>{
  let endPoint = '/signup/otp'
  let body = {phoneNumber}
return this.http.post(this.apiUrl+endPoint,body);
}

userLogin(body:any):Observable<any>{
  return this.http.post(this.apiUrl+'/login/user',body)
}

}
