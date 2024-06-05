import { Component, inject } from '@angular/core';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IdeaItemComponent } from './idea-item/idea-item.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdeaItem } from '../_services/rest-backend/idea-item.type';

@Component({
  selector: 'app-idea-page',
  standalone: true,
  imports: [IdeaItemComponent, ReactiveFormsModule],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss'
})
export class IdeaPageComponent {
  createIdeaSubmitted = false;
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);
  ideas: IdeaItem[] = []; //array of IdeaItem

  newIdeaForm = new FormGroup({
    idea: new FormControl('', [Validators.required])
  })
  
  ngOnInit() {
    this.fetchIdeas();  
  }

  fetchIdeas(){
    this.restService.getMyIdeas().subscribe({
      next: (data) => {
        console.log(data);
        this.ideas = data;
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

  handleIdeaSubmit(){
    this.createIdeaSubmitted = true;
    if(this.newIdeaForm.invalid){
      this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
    } else {
      this.restService.createIdea({
        title: this.newIdeaForm.value.idea as string,
        description: this.newIdeaForm.value.idea as string
      }).subscribe({
        next: (idea) => {
          this.toastr.success(`Idea item: ${idea.title}`, "Idea saved correctly!");
          this.createIdeaSubmitted = false;
          this.newIdeaForm.setValue({idea: ""});
        },
        error: (err) => {
          this.toastr.error("Could not save the idea item.", "Oops! Something went wrong.");
        },
        complete: () => {
          this.fetchIdeas();
          this.newIdeaForm.value.idea = ''; //reset input field
        }
      })
    }
  }

  handleDelete(id: number | undefined){
    console.log("DELETE HERE");
    console.log(id);
    this.ideas = this.ideas.filter((x) => x.id !== id)
  }
}
