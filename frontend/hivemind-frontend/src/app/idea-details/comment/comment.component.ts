import { Component, EventEmitter, Input, inject, numberAttribute } from '@angular/core';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IdeaItemComponent } from '../../idea-page/idea-item/idea-item.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentItem } from '../../_services/rest-backend/comment-item.type';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [IdeaItemComponent, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({required: true}) comment: CommentItem[] = [];
  createCommentSubmitted = false;
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);

  newCommentForm = new FormGroup({
    content: new FormControl('', [Validators.required])
  })
  
  ngOnInit() {
     this.loadComments();
  }
  
  loadComments(){
    this.restService.getComments(this.idea.id!).subscribe({
      next: (data) => {
        console.log(data);
        this.comment = data;
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
