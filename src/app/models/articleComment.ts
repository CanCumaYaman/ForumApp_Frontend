export interface ArticleComment{
    id?:number,
    comment:string,
    userId:number,
    articleId:number,
    createdDate?:Date 
}