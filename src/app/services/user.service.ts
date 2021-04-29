import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserFullName } from '../models/userFullName';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44312/api/Users/";
  constructor(private httpClient:HttpClient) { }

  getUserFullName(email:string){
   return this.httpClient.get<SingleResponseModel<UserFullName>>(this.apiUrl+"getfullname?mail="+email);
  }
}
