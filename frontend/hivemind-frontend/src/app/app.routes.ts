import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { IdeaPageComponent } from './idea-page/idea-page.component';
import { authGuard } from './_guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {
    path: "home",
    component: HomepageComponent,
    title: "Hivemind Angular App"
  }, {
    path: "login",
    component: LoginComponent,
    title: "Login | Hivemind Angular App"
  }, {
    path: "signup",
    component: SignupComponent,
    title: "Sign up | Hivemind Angular App"
  }, {
    path: "logout",
    component: LogoutComponent,
    title: "Log out | Hivemind Angular App"
  }, {
    path: "ideas",
    component: IdeaPageComponent,
    title: "My Ideas List | Hivemind Angular App",
    canActivate: [authGuard]
  }, {
    path: "",
    redirectTo: "/home",
    pathMatch: 'full'
  },
];
