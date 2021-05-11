import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { CommentDto } from 'src/app/models/commentDto';
import { UserFullName } from 'src/app/models/userFullName';
import { ArticleCommentService } from 'src/app/services/article-comment.service';
import { ArticleService } from 'src/app/services/article.service';
import { LocalStorageService } from 'src/app/services/localStorage';
import { UserService } from 'src/app/services/user.service';
import { ArticleComment } from 'src/app/models/articleComment';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  commentForm:FormGroup;
  article:Article;
  userDto:UserFullName;
  articleId:number;
  comments:CommentDto[];
  commentingUserId:number;
  email:string;
  constructor(private activatedRoute:ActivatedRoute,private articleService:ArticleService,private articleCommentService:ArticleCommentService, private userService:UserService,private localStorageService:LocalStorageService, private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
   this.createCommentAddForm();
   this.getCommentingUserId();

   this.activatedRoute.params.subscribe(params=>{
     if(params['articlesId']){
       this.getArticleById(params['articlesId']);
       this.articleId=params['articlesId'];
     }
   });
   this.getArticlesComment();
  }

  getArticleById(id:number){
    this.articleService.getArticleById(id).subscribe(response=>{
      this.article=response.data;
      this.getUserFullName(this.article.userId);
    },
    responseError=>{
      this.toastrService.error(responseError.error);
    })
  }

  getUserFullName(id:number){
    this.userService.getUserFullNameById(id).subscribe(response=>{
      this.userDto=response.data;
    })
  }
  
  getArticlesComment(){
    this.articleCommentService.getArticleCommentsByArticleId(this.articleId).subscribe(response=>{
      this.comments=response.data;
    },
    responseError=>{
      this.toastrService.error("Something went wrong while comments loading");
    }
    )
  }

  createCommentAddForm(){
    this.commentForm=this.formBuilder.group({
      comment:["",Validators.required]
    });
     
  }

  getCommentingUserId(){
    this.email=JSON.stringify(this.localStorageService.getItem("email")).replace(/^"|"$/g, '');
    this.userService.getUserId(this.email).subscribe(response=>{
      this.commentingUserId=response;
    })
  }

  addComment(){
    if(this.commentForm.valid){
      const articleModel:ArticleComment={
         comment:this.commentForm.controls['comment'].value,
         userId:this.commentingUserId,
         articleId:this.articleId
      }
      this.articleCommentService.addArticleComment(articleModel).subscribe(response=>{
        this.toastrService.success("Successfull",response.message);
      },
      responseError=>{
        this.toastrService.error("Something went wrong while adding your comment",responseError.error);
      })
    }else{
      this.toastrService.error("Please enter valid comment form");
    }
  }
}
