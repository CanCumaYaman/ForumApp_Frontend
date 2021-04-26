import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage';

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
  
 
  
  loginForm:FormGroup;
  constructor(private authService:AuthService,private formBuilder:FormBuilder,private localStorage:LocalStorageService, private toastrService:ToastrService) { }
  
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
loginControl(){
if(this.loginForm.valid){
  let loginModel=Object.assign({},this.loginForm.value);
  this.authService.loginControl(loginModel).subscribe(response=>{
    this.toastrService.success(response.message,"Login successfull");
    this.localStorage.setItem("email",this.loginForm.get("email")?.value);
    this.localStorage.setItem("token",response.data.token);
    setTimeout(()=>{
      window.location.href='';
    },100)
  },
  responseError=>{
    this.toastrService.error(responseError.error,"Username or password wrong");
  }
  )
} else{
  this.toastrService.error("Please enter valid form");
}
  
}
}
