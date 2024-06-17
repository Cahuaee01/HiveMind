import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { IdeaItem } from '../../_services/rest-backend/idea-item.type';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-idea-item',
  standalone: true,
  imports: [RouterLink, MarkdownComponent],
  templateUrl: './idea-item.component.html',
  styleUrl: './idea-item.component.scss'
})
export class IdeaItemComponent {
  @Input({ required: true}) ideaItem: IdeaItem; //set "strictPropertyInitialization": false in tsconfig
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() upvote: EventEmitter<number> = new EventEmitter();
  @Output() downvote: EventEmitter<number> = new EventEmitter();
  restBackend = inject(RestBackendService);
  toastr = inject(ToastrService);


  ngOnInit(){
  }

  handleDelete(){
    if(this.ideaItem !== null){
      this.restBackend.delete(this.ideaItem)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            this.toastr.error("Error when deleting the idea");
          },
          complete: () => {
            this.toastr.success(`Idea item "${this.ideaItem?.title}" deleted`, `Idea deleted`);
            this.delete.emit(this.ideaItem?.id);
          }
        })
    }
  }

  handleUpvote(){
    if(this.ideaItem !== null){
      this.restBackend.upvote(this.ideaItem.id as number)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.ideaItem.upvotes!++;
          },
          error: (err) => {
            this.toastr.error("Error when upvoting the idea");
          }
        })
    }
  }

  handleDownvote(){
    if(this.ideaItem !== null){
      this.restBackend.downvote(this.ideaItem.id as number)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.ideaItem.downvotes!++;
          },
          error: (err) => {
            this.toastr.error("Error when downvoting the idea");
          }
        })
    }
  }
}
