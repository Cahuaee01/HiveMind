import { Component } from '@angular/core';
import { CommentItem } from '../../_services/rest-backend/comment-item.type';
import { Input,inject } from '@angular/core';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({required : true}) comment: CommentItem;
  toastr = inject(ToastrService);
  commentDate: string = "";

  ngOnInit(){
    this.toastr.info("Loading comments");
    this.commentDate = this.comment.createdAt?.toString() as string;
  }
}



