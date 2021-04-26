import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Login } from '../models/login';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './localStorage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44312/api/Auths/";
  constructor(private httpClient:HttpClient,private localStorage:LocalStorageService) { }

  loginControl(login:Login){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",login);
  }
  isAuthenticated(){
    if(this.localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}
