import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';
import { PageNotFoundComponent } from './comp/page-not-found/page-not-found.component';
import { SigninComponent } from './comp/signin/signin.component';
import { SignupComponent } from './comp/signup/signup.component';

const appNameTitle = "Grocers"

const routes: Routes = [
  {
    path: "",
    title: ':Home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "home",
    title: appNameTitle + ' - Home',
    component: HomeComponent
  },
  {
    path: "login",
    title: appNameTitle + ' - Sign In',
    component: SigninComponent
  },
  {
    path: "signin",
    title: appNameTitle + ' - Sign In',
    component: SigninComponent
  },
  {
    path: "signup",
    title: appNameTitle + ' - Sign Up',
    component: SignupComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
