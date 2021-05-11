import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Question } from 'src/app/models/question';
import { ArticleService } from 'src/app/services/article.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.css',
    '../../.././assets/Footer/css/style.css',
  ]
})
export class FooterComponent implements OnInit {

  questions:Question[];
  lastQuestions:Question[];
  articles:Article[];
  constructor(private questionService:QuestionService,private articleService:ArticleService) { }

  ngOnInit(): void {
    this.getLastArticles();
    this.getLastQuestions();
  }

  getLastQuestions(){
    this.questionService.getAll().subscribe(response=>{
      this.questions=response.data;
      this.lastQuestions[0]=this.questions[this.questions.length-1];
      this.lastQuestions[1]=this.questions[this.questions.length-2];
      this.lastQuestions[2]=this.questions[this.questions.length-3];
    })
  }
  getLastArticles(){
    this.articleService.getAll().subscribe(response=>{
      this.articles=response.data;
    })
  }
}
