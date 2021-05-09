import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions:Question[];
  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {
    this.getQuestions();
  }
  getQuestions(){
    this.questionService.getAll().subscribe(response=>{
      this.questions=response.data;
    })
  }

}
