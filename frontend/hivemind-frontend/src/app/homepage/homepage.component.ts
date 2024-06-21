import { Component, inject } from '@angular/core';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { IdeaItem } from '../_services/rest-backend/idea-item.type';
import { AllIdeaItemsComponent } from './all-idea-items/all-idea-items.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AllIdeaItemsComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);
  homepageData: IdeaItem[] = [];
  currentPage: number = 1;
  currentFilter: number = 0;
  authService = inject(AuthService);
  windowScrolled = false;

  ngOnInit(): void {
    this.fetchHomepage(this.currentFilter, this.currentPage);
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  fetchHomepage(filter: number, page: number): void {
    this.restService.getHomepage(filter, page).subscribe({
      next: (data) => {
        const fetchedData = data as IdeaItem[];
        if (fetchedData.length === 0 && page > 1) {
          this.currentPage--;
          this.toastr.error("No more items on the next page");
        } else {
          this.homepageData = fetchedData;
        }
      },
      error: (err) => {
        this.toastr.error("Error fetching homepage data");
      },
      complete: () => {
        this.toastr.info("Homepage data fetched");
      }
    });
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchHomepage(this.currentFilter, this.currentPage);
      this.scrollToTop();
    } else {
      this.toastr.error("Cannot go to previous page");
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchHomepage(this.currentFilter, this.currentPage);
    this.scrollToTop();
  }

  handleUpvote(id: number | undefined): void {
    console.log("UPVOTE HERE");
    console.log(id);
    this.toastr.success("Upvoted the idea");
  }

  handleDownvote(id: number | undefined): void {
    console.log("DOWNVOTE HERE");
    console.log(id);
    this.toastr.success("Downvoted the idea");
  }
}
