import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { IdeaItem } from '../../_services/rest-backend/idea-item.type';

@Component({
  selector: 'app-idea-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './idea-item.component.html',
  styleUrl: './idea-item.component.scss'
})
export class IdeaItemComponent {
  @Input({ required: true}) ideaItem: IdeaItem; //set "strictPropertyInitialization": false in tsconfig
  @Output() delete: EventEmitter<number | undefined> = new EventEmitter();
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
}
