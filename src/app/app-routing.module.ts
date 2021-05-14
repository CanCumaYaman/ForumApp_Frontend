import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleAddComponent } from './components/article-add/article-add.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleComponent } from './components/article/article.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  { path:"",pathMatch:"full",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"askQuestion",component:AskQuestionComponent,canActivate:[LoginGuard]},
  {path:"articles/addArticle",component:ArticleAddComponent,canActivate:[LoginGuard]},
  {path:"questions/:questionId",component:QuestionDetailComponent},
  {path:"articles",component:ArticleComponent},
  {path:"articles/:articlesId",component:ArticleDetailComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
