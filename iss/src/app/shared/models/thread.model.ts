export interface Thread{
  id:string,
  title:string,
  posts?:Post[]
}
export interface Post{
    text:string,
    postedOn:Date,
    poster?:string
}
