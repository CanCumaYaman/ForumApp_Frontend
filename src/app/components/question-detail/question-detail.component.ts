import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentDto } from 'src/app/models/commentDto';
import { Question } from 'src/app/models/question';
import { QuestionComment } from 'src/app/models/questionComment';
import { UserFullName } from 'src/app/models/userFullName';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage';
import { QuestionCommentService } from 'src/app/services/question-comment.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  question:Question;
  userDto:string;
  dataLoaded:false;
  email:string;
  comments:CommentDto[];
  commentingUserId:number;
  questionId:number;
  commentForm:FormGroup;
  constructor(private questionService:QuestionService, private questionCommentService:QuestionCommentService,private router:Router, private localStorageService:LocalStorageService,private authService:AuthService, private userService:UserService,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCommentAddForm();
    
    
    this.activatedRoute.params.subscribe(params=>{
  if(params["questionId"]){
  this.getQuestionById(params["questionId"]);
  this.questionId=params["questionId"];
  }
});
this.getQuestionComments();

  }
  getQuestionById(id:number){
    this.questionService.getQuestionById(id).subscribe(response=>{
      this.question=response.data;
      this.getUserFullName(this.question.userId);
    },
    responseError=>{
      this.toastrService.error(responseError.error);
    }
    )
  }
  getUserFullName(id:number){
   this.userService.getUserFullNameById(id).subscribe(response=>{
  this.userDto=response.message;
   })
  }
  getQuestionComments(){
    this.questionCommentService.getQuestionCommentsByQuestionId(this.questionId).subscribe(response=>{
    this.comments=response.data;
    },
    responseError=>{
      this.toastrService.error("Something went wrong while loading comments");
    })
  }

  createCommentAddForm(){
    this.commentForm=this.formBuilder.group({
      comment:["",Validators.required]
    });

  }
  getCommentingUserId(){
    return new Promise(resolve=>{
      this.email=JSON.stringify(this.localStorageService.getItem("email")).replace(/^"|"$/g, '');
      this.userService.getUserId(this.email).subscribe(response=>{
      this.commentingUserId=response;
      resolve(true);
    }) 
    })
  }

   async addComment() {
    if(!this.authService.isAuthenticated()){
      this.toastrService.info("You must be login for add comment");
      this.router.navigate(['/login']);
      return;
    }
   await  this.getCommentingUserId();
    if(this.commentForm.valid){
      
      const commentModel:QuestionComment={
        comment:this.commentForm.controls['comment'].value,
        userId:this.commentingUserId,
        questionId:this.questionId
      }

     this.questionCommentService.addQuestionComment(commentModel).subscribe(response=>{
        
         window.location.reload();
      },
      responseError=>{
        this.toastrService.error("Error occured while adding your comment",responseError.error);
      }
      )
    } else{
     this.toastrService.error("Please enter valid comment");
    }
  }

}
