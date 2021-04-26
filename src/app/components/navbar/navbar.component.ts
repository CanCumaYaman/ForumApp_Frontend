import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email:string;
  dataLoaded:Boolean=false;
  constructor(private authService:AuthService,private localStorage:LocalStorageService) {
if(this.isLoggedIn()){
  this.email=JSON.stringify(this.localStorage.getItem("email")).replace(/^"|"$/g, '');
  this.dataLoaded=true;
}
   }

  ngOnInit(): void {
  }
isLoggedIn(){
  return this.authService.isAuthenticated();
}
}
