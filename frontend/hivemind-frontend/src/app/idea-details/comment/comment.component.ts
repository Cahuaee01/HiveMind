import { Component } from '@angular/core';
import { CommentItem } from '../../_services/rest-backend/comment-item.type';
import { Input,inject } from '@angular/core';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({required : true}) comment: CommentItem;
  commentDate: string = "";

  ngOnInit(){
    this.commentDate = this.comment.createdAt?.toString() as string;
  }
}



