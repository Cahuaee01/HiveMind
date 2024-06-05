import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-idea-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './idea-detail.component.html',
  styleUrl: './idea-detail.component.scss'
})
export class IdeaDetailComponent {
  constructor(private route:ActivatedRoute){}
  id: number = 0;
  ideaItem: any;

  updateIdeaSubmitted = false;
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);

  updateIdeaForm = new FormGroup({
    idea: new FormControl('', [Validators.required])
  })

  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    this.restService.getIdeaById(this.id)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.ideaItem = data;
          this.updateIdeaForm.controls.idea.setValue(data.idea);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          
        }
      });
  }

  handleUpdateIdeaSubmit(){
    this.updateIdeaSubmitted = true;
    if(this.updateIdeaForm.invalid){
      this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
    } else {
      this.ideaItem.idea = this.updateIdeaForm.value.idea as string;
      console.log(this.ideaItem);
      this.restService.update(this.ideaItem).subscribe({
        next: (idea) => {
          this.toastr.success(`Idea item: ${idea.idea}`, "Idea updated correctly!")
        },
        error: (err) => {
          this.toastr.error("Could not save the idea item.", "Oops! Something went wrong.");
        },
        complete: () => {
          this.router.navigateByUrl("/ideas"); //back to ideas page
        }
      })
    }
  }
}
