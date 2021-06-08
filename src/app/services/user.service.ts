import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserFullName } from '../models/userFullName';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  id:number;
  apiUrl="https://localhost:44312/api/Users/";
  constructor(private httpClient:HttpClient) { }

  getUserFullNameByMail(email:string){
   return this.httpClient.get<SingleResponseModel<string>>(this.apiUrl+"getfullnamebymail?mail="+email);
  }
  getUserId(email:string){
    return this.httpClient.get<number>(this.apiUrl+"getuserid?mail="+email);
   }
   getUserFullNameById(id:number){
     return this.httpClient.get<SingleResponseModel<string>>(this.apiUrl+"getfullnamebyid?id="+id);
   }
}
