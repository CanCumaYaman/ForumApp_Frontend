import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserFullName } from 'src/app/models/userFullName';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email:string;
  userFullName:UserFullName;
  dataLoaded:Boolean=false;
  constructor(private authService:AuthService,private localStorage:LocalStorageService,private userService:UserService,private toastrService:ToastrService) {
if(this.isLoggedIn()){
  this.email=JSON.stringify(this.localStorage.getItem("email")).replace(/^"|"$/g, '');
  this.dataLoaded=true;
}this.getUserInfo();
   }

  ngOnInit(): void {
  }
isLoggedIn(){
  return this.authService.isAuthenticated();
}
logOut(){
  return this.authService.logOut();
}
getUserInfo(){
 this.userService.getUserFullName(this.email).subscribe(response=>{
this.userFullName=response.data;
 });
}
}
