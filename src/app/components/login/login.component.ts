import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../.././assets/Login_v18/vendor/animate/animate.css',
    '../../.././assets/Login_v18/vendor/css-hamburgers/hamburgers.min.css',
    '../../.././assets/Login_v18/vendor/animsition/css/animsition.min.css',
    '../../.././assets/Login_v18/vendor/select2/select2.min.css',
    '../../.././assets/Login_v18/vendor/daterangepicker/daterangepicker.css',
    '../../.././assets/Login_v18/css/util.css',
    '../../.././assets/Login_v18/css/main.css',
]
})
export class LoginComponent implements OnInit {
  
 
  

  constructor() { }

  ngOnInit(): void {
  }
loginControl(){
  console.log("Login oldu");
}
}
