import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Question } from '../models/question';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl="https://localhost:44312/api/Questions/";
  constructor(private httpClient:HttpClient) { }

  addQuestion(question:Question){
    return this.httpClient.post<SingleResponseModel<Question>>(this.apiUrl+"add",question);
  }
  getAll(){
    return this.httpClient.get<ListResponseModel<Question>>(this.apiUrl+"getall");
  }
  deleteQuestion(question:Question){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",question);
  }
  getQuestionById(id:number){
    return this.httpClient.get<SingleResponseModel<Question>>(this.apiUrl+"getbyid?questionId="+id);
  }

}
