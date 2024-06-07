import { Component, EventEmitter, Input, inject, numberAttribute } from '@angular/core';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IdeaItemComponent } from '../idea-page/idea-item/idea-item.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentItem } from '../_services/rest-backend/comment-item.type';
import { IdeaItem } from '../_services/rest-backend/idea-item.type';
import { AuthService } from '../_services/auth/auth.service';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-idea-details',
  standalone: true,
  imports: [IdeaItemComponent, ReactiveFormsModule, CommentComponent],
  templateUrl: './idea-details.component.html',
  styleUrl: './idea-details.component.scss'
})
export class IdeaDetailsComponent {
  comment: CommentItem[] = [];
  idea: IdeaItem[] = [];
  createCommentSubmitted = false;
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);

  newCommentForm = new FormGroup({
    content: new FormControl('', [Validators.required])
  })
  
  ngOnInit() {
    this.loadIdea();  
  }

  loadIdea(){
    this.restService.getIdeaById(this.idea.id).subscribe({
      next: (data) => {
        console.log(data);
        this.idea = data;
      },
      error: (err) => {
        if(err.status === 401){
          this.toastr.error("Your access token appears to be invalid. Login again", "Token expired");
          this.router.navigateByUrl("/login");
        } else {
          this.toastr.error(err.message, err.statusText)
        }
      }
    });
  }

  handleCommentSubmit(){
    this.createCommentSubmitted = true;
    if(this.newCommentForm.invalid){
      this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
    } else {
      this.restService.postComment(
        this.idea.id as number,
        this.newCommentForm.value.content as string
      ).subscribe({
        next: (idea) => {
          this.toastr.success(`Comment saved correctly!`, "Success!");
          this.createCommentSubmitted = false;
          this.newCommentForm.setValue({content: ""});
        },
        error: (err) => {
          this.toastr.error("Could not save the idea item.", "Oops! Something went wrong.");
        },
        complete: () => {
          this.loadIdea();
          this.newCommentForm.value.content = ''; //reset input field
        }
      })
    }
  }
}
