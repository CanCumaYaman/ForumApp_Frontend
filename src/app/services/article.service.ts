import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl="https://localhost:44312/api/Articles/";
  constructor(private httpClient:HttpClient) { }

  addArticle(article:Article){
    return this.httpClient.post<SingleResponseModel<Article>>(this.apiUrl+"add",article);
  }
  getAll(){
    return this.httpClient.get<ListResponseModel<Article>>(this.apiUrl+"getall");
  }
  deleteQuestion(article:Article){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",article);
  }
  getArticleById(id:number){
    return this.httpClient.get<SingleResponseModel<Article>>(this.apiUrl+"getbyid?articleId="+id);
  }

}
