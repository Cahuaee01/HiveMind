import { Component, inject} from '@angular/core';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentItem } from '../_services/rest-backend/comment-item.type';
import { IdeaItem } from '../_services/rest-backend/idea-item.type';
import { CommentComponent } from './comment/comment.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-idea-details',
  standalone: true,
  imports: [CommentComponent, ReactiveFormsModule],
  templateUrl: './idea-details.component.html',
  styleUrl: './idea-details.component.scss'
})

export class IdeaDetailsComponent {
  comments: CommentItem[] = [];
  idea: IdeaItem = {} as IdeaItem;
  id: number = 0;
  createCommentSubmitted = false;
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);

  constructor(private route: ActivatedRoute) { }

  newCommentForm = new FormGroup({
    content: new FormControl('', [Validators.required])
  })
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id?.startsWith('$')) {
      id = id.substring(1);
    }
    if (!isNaN(Number(id))) {
      this.id = Number(id); 
      console.log(this.id);
      this.loadIdea();  
      this.loadComments();
    } else {
      console.error('Invalid id:', id);
    }
  }

  loadIdea(){
    this.restService.getIdeaById(this.id).subscribe({
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

  handleUpvote(id: number): void {
    this.restService.upvote(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        this.toastr.error("Error upvoting idea");
      },
      complete: () => {
        this.toastr.info("Idea upvoted");
      }
    });
  }

  handleDownvote(id: number): void {
    this.restService.downvote(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        this.toastr.error("Error downvoting idea");
      },
      complete: () => {
        this.toastr.info("Idea downvoted");
      }
    });
  }

  loadComments(){
    this.restService.getComments(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.comments = data as CommentItem[];
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

}
