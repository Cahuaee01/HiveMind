import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

// Component that displays the login form

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  toastr = inject(ToastrService);
  router = inject(Router);
  restService = inject(RestBackendService);
  authService = inject(AuthService);
  submitted = false;
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(16)])
  })
  
  handleLogin() {
    this.submitted = true;
    if(this.loginForm.invalid){
      this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
    } else {
      this.restService.login({
        usr: this.loginForm.value.user as string,
        pwd: this.loginForm.value.pass as string,
      }).subscribe({
        next: (token) => {
          this.authService.updateToken(token);
        },
        error: (err) => {
          this.toastr.error("Please, insert a valid username and password", "Oops! Invalid credentials");
        },
        complete: () => {
          this.toastr.success(`You can now manage your ideas`,`Welcome ${this.loginForm.value.user}!`);
          this.router.navigateByUrl("/ideas");
        }
      })
    }
  }
}
