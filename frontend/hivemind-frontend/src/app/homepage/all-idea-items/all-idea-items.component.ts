import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { IdeaItem } from '../../_services/rest-backend/idea-item.type';

@Component({
  selector: 'app-all-idea-items',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-idea-items.component.html',
  styleUrl: './all-idea-items.component.scss'
})
export class AllIdeaItemsComponent {
  @Input({ required: true}) ideaItem : IdeaItem; //set "strictPropertyInitialization": false in tsconfig
  @Output() upvote: EventEmitter<number | undefined> = new EventEmitter();
  @Output() downvote: EventEmitter<number | undefined> = new EventEmitter();
  restBackend = inject(RestBackendService);
  toastr = inject(ToastrService);

  ngOnInit(){
  }

  handleUpvote(){
    if(this.ideaItem !== null){
      this.restBackend.upvote(this.ideaItem.id!)
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
      this.restBackend.downvote(this.ideaItem.id!)
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
