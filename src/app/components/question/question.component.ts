import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionForm:FormGroup;
  constructor(private questionService:QuestionService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createQuestionAddForm();
  }
  createQuestionAddForm(){
this.questionForm=this.formBuilder.group({
  title:["",Validators.required],
  body:["",Validators.required],
  topic:["",Validators.required],
})

  }

}
