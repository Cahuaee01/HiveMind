import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaItem } from './idea-item.type';
import { AuthRequest } from './auth-request.type';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {

  url = "http://localhost:3000" 
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

  getMyIdeas() {
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

}
