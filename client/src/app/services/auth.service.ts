import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  http = inject(HttpClient);
  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }
  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }
  //logout service using backend api
  logoutService(){
    return this.http.get<any>(`${apiUrls.authServiceApi}logout`);
  }
  //change password service
  changePasswordService(userId: string, changePasswordObj: any){
    return this.http.put<any>(`${apiUrls.userServiceApi}change-password/${userId}`, changePasswordObj);
  }
}
