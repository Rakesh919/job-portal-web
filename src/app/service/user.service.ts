import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IJobForm } from '../interfaces/jobForm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  sendToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });
  
    return headers;
  }

jobPost(data: IJobForm): Observable<IJobForm> {
  let headers = this.sendToken();
  let endPoint = '/job/post'
  return this.http.post<any>(this.apiUrl+endPoint, data,{headers});
}


addUser(data:any):Observable<any>{
  let endPoint = '/user/signup'
  return this.http.post(this.apiUrl+endPoint,data)
}

generateOtp(phoneNumber:string):Observable<any>{
  let endPoint = '/user/otp'
  let body = {phoneNumber}
return this.http.post(this.apiUrl+endPoint,body);
}

userLogin(body:any):Observable<any>{
  let endPoint = '/user/login'
  return this.http.post(this.apiUrl+endPoint,body)
}

getAllJobs():Observable<any>{
  let endPoint = '/job/get'
  let headers = this.sendToken()
 return this.http.get(this.apiUrl+endPoint,{headers});
}

}
