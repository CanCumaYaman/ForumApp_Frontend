import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleComment } from '../models/articleComment';
import { CommentDto } from '../models/commentDto';
import { ListResponseModel } from '../models/listResponseModel';


import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ArticleCommentService {

  apiUrl="https://localhost:44312/api/ArticleComments/";
  constructor(private httpClient:HttpClient) { }

  addArticleComment(comment:ArticleComment){
    return this.httpClient.post<SingleResponseModel<ArticleComment>>(this.apiUrl+"add",comment);
  }
  getArticleCommentsByArticleId(id:number){
   return this.httpClient.get<ListResponseModel<CommentDto>>(this.apiUrl+"getcommentbyid?articleId="+id);
  }
}
