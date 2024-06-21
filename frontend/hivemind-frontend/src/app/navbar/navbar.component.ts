import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

// Component that displays the navbar

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isOpen = false; //determines whether the mobile navbar is toggled or not
  isDropdownOpen = false;
  
  authService = inject(AuthService);

  ngOnInit(){
    document.addEventListener('DOMContentLoaded', function() {
      let isFocused = false;
      const button = document.getElementById('b1');
      isFocused = false;
  
      button?.addEventListener('click', function() {
        if(isFocused){
          button.blur();
          isFocused = false;
        } else {
          button.focus();
          isFocused = true;
        }});
    });
  }

  /**
   * Handles user click on the navbar menu toggle on small screens
   */
  toggle() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Closes the toggled navbar when a user clicks on a link
   */
  handleNavigationClick(){
    this.isOpen = false;
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
