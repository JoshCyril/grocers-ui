import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';
import { SigninComponent } from './comp/signin/signin.component';
import { SignupComponent } from './comp/signup/signup.component';

const routes: Routes = [
  { path: "", redirectTo: 'Home', pathMatch: 'full' },
  { path: "Home", component: HomeComponent },
  { path: "Login", component: SigninComponent },
  { path: "Signin", component: SigninComponent },
  { path: "Signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
