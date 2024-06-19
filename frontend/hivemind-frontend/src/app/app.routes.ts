import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { IdeaPageComponent } from './idea-page/idea-page.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { authGuard } from './_guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {
    path: "home",
    component: HomepageComponent,
    title: "Hivemind"
  }, {
    path: "login",
    component: LoginComponent,
    title: "Login | Hivemind"
  }, {
    path: "signup",
    component: SignupComponent,
    title: "Sign up | Hivemind"
  }, {
    path: "logout",
    component: LogoutComponent,
    title: "Log out | Hivemind"
  }, {
    path: "ideas",
    component: IdeaPageComponent,
    title: "My Ideas | Hivemind",
    canActivate: [authGuard]
  }, {
    path: "idea-details/:id",
    component: IdeaDetailsComponent,
    canActivate: [authGuard]
  }, {
    path: "",
    redirectTo: "/home",
    pathMatch: 'full'
  }, {
    path: "**",
    redirectTo: "/home"
  }
];
