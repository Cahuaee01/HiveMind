import { Component } from '@angular/core';
import { IdeaItem } from '../../_services/rest-backend/idea-item.type';
import { CommentItem } from '../../_services/rest-backend/comment-item.type';
import { Input, Output, EventEmitter, inject } from '@angular/core';
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
  @Input({required : true}) idea: IdeaItem;
  @Input({required : true}) comment: CommentItem;
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);

  ngOnInit(){
  }
}



