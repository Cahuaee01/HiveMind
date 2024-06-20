import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaItem } from './idea-item.type';
import { AuthRequest } from './auth-request.type';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {

  //url = "http://localhost:3000" 
  url = "http://192.168.1.15:3000"
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(loginRequest: AuthRequest){
    const url = `${this.url}/login`; 
    return this.http.post<string>(url, loginRequest, this.httpOptions);
  }

  signup(signupRequest: AuthRequest){
    const url = `${this.url}/signup`; 
    console.log(signupRequest);
    return this.http.post(url, signupRequest, this.httpOptions);
  }

  getHomepage(typeofHomepage: number, numberofPage: number){
    if(typeofHomepage === 0){
      const url = `${this.url}/homepage/controversial/${numberofPage}`; 
      return this.http.get(url, this.httpOptions);
    }else if(typeofHomepage === 1){
      const url = `${this.url}/homepage/mainstream/${numberofPage}`; 
      return this.http.get(url, this.httpOptions);
    }else{
      const url = `${this.url}/homepage/unpopular/${numberofPage}`; 
      return this.http.get(url, this.httpOptions);
    }
  }

  getMyIdeas(){
    const url = `${this.url}/ideas`; 
    return this.http.get<IdeaItem[]>(url, this.httpOptions);
  }

  getIdeaById(id: number) {
    const url = `${this.url}/ideas/${id}`; 
    return this.http.get<IdeaItem>(url, this.httpOptions);
  }

  createIdea(idea: IdeaItem){
    const url = `${this.url}/ideas`;
    return this.http.post<IdeaItem>(url, idea, this.httpOptions);
  }

  update(ideaItem: IdeaItem) {
    const url = `${this.url}/ideas/${ideaItem.id}`; 
    console.log(ideaItem);
    return this.http.put<IdeaItem>(url, ideaItem, this.httpOptions);
  }

  delete(ideaItem: IdeaItem) {
    const url = `${this.url}/ideas/${ideaItem.id}`; 
    return this.http.delete(url, this.httpOptions);
  }

  upvote(id: number) {
    const url = `${this.url}/ideas/${id}/upvote`; 
    return this.http.post(url, this.httpOptions);
  }

  downvote(id: number) {
    const url = `${this.url}/ideas/${id}/downvote`; 
    return this.http.post(url, this.httpOptions);
  }

  getComments(id: number) {
    const url = `${this.url}/ideas/${id}/comments`; 
    return this.http.get(url, this.httpOptions);
  }

  postComment(id: number, comment: string) {
    const url = `${this.url}/ideas/${id}/comments`; 
    return this.http.post(url, {content: comment}, this.httpOptions);
  }

}
