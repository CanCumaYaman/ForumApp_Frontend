import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { LocalStorageService } from 'src/app/services/localStorage';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

  articleForm:FormGroup;
  id:number;
  email:string;
  constructor(private articleService:ArticleService,private userService:UserService,private router:Router, private localStorageService:LocalStorageService, private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    
  }

  createArticleAddForm(){
    this.articleForm=this.formBuilder.group({
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
  addArticle(){
    
    if(this.articleForm.valid){
      
      const articleModel:Article={
        
        title:this.articleForm.controls['title'].value,
        body:this.articleForm.controls['body'].value,
        topic:this.articleForm.controls['topic'].value,
        userId:this.id
      }
      this.articleService.addArticle(articleModel).subscribe(response=>{
        this.toastrService.success(response.message,"Successfull");
        setTimeout(() => 
    {
      this.router.navigateByUrl('home');
    },
    2000);
      },
      responseError=>{
        this.toastrService.error(responseError.error);
      }
      )
    }else{
      this.toastrService.error("Please ask valid article form");
    }
  
  }

}
