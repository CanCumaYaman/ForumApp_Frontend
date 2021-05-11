import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDto } from '../models/commentDto';
import { ListResponseModel } from '../models/listResponseModel';
import { QuestionComment } from '../models/questionComment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class QuestionCommentService {

  apiUrl="https://localhost:44312/api/QuestionComments/";
  constructor(private httpClient:HttpClient) { }

  addQuestionComment(comment:QuestionComment){
    return this.httpClient.post<SingleResponseModel<QuestionComment>>(this.apiUrl+"add",comment);
  }
  getQuestionCommentsByQuestionId(id:number){
   return this.httpClient.get<ListResponseModel<CommentDto>>(this.apiUrl+"getcommentbyid?questionId="+id);
  }
}
