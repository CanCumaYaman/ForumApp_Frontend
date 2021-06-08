import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question';
import { LocalStorageService } from 'src/app/services/localStorage';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  questionForm:FormGroup;
  id:number;
  email:string;
  constructor(private questionService:QuestionService,private userService:UserService,private router:Router, private localStorageService:LocalStorageService, private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createQuestionAddForm();
    this.getUserId();
  }

  createQuestionAddForm(){
    this.questionForm=this.formBuilder.group({
      title:["",Validators.required],
      body:["",Validators.required],
      topic:["",Validators.required]

    })
  }
  getUserId(){
    this.email=JSON.stringify(this.localStorageService.getItem("email")).replace(/^"|"$/g, '');
    this.userService.getUserId(this.email).subscribe(response=>{
    this.id=response;
    })
    
  }
  addQuestion(){
    
    if(this.questionForm.valid){
      
      const questionModel:Question={
        
        title:this.questionForm.controls['title'].value,
        body:this.questionForm.controls['body'].value,
        topic:this.questionForm.controls['topic'].value,
        userId:this.id
      }
      this.questionService.addQuestion(questionModel).subscribe(response=>{
        this.toastrService.success(response.message,"Successfull");
        setTimeout(() => 
    {
      this.router.navigateByUrl('home');
    },
    2000);
      },
      responseError=>{
        this.toastrService.error(responseError.error);
        console.log(responseError);
      }
      )
    }else{
      this.toastrService.error("Please ask valid question form");
    }
  
  }

}
