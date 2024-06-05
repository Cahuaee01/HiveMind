import { Component, inject } from '@angular/core';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { IdeaItem } from '../_services/rest-backend/idea-item.type';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);
  homepageData: IdeaItem[] = [];
  currentPage: number = 0;
  currentFilter: number = 0;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.fetchHomepage(this.currentFilter, this.currentPage);
  }

  fetchHomepage(filter: number, page: number): void {
    this.restService.getHomepage(filter, page).subscribe({
      next: (data) => {
        this.homepageData = data as IdeaItem[];
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
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchHomepage(this.currentFilter, this.currentPage);
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchHomepage(this.currentFilter, this.currentPage);
  }
}

