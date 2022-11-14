import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './comp/add/product/product.component';
import { UserComponent } from './comp/add/user/user.component';
import { CategoriesComponent } from './comp/edit/categories/categories.component';
import { CategoryComponent } from './comp/add/category/category.component';
import { ProductsComponent } from './comp/edit/products/products.component';
import { UsersComponent } from './comp/edit/users/users.component';
import { HomeComponent } from './comp/home/home.component';
import { PageNotFoundComponent } from './comp/page-not-found/page-not-found.component';
import { SigninComponent } from './comp/signin/signin.component';
import { SignupComponent } from './comp/signup/signup.component';
import { ProfileComponent } from './comp/profile/profile.component';
import { ShopComponent } from './comp/shop/shop.component';

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
  { path: "shop", title: appNameTitle + ' - Shop', component: ShopComponent },
  { path: "shop/:id", title: appNameTitle + ' - Shop by Category', component: ShopComponent },

  { path: "e/users", title: appNameTitle + ' - Edit Users', component: UsersComponent },
  { path: "e/products", title: appNameTitle + ' - Edit Products', component: ProductsComponent },
  { path: "e/categories", title: appNameTitle + ' - Edit Categories', component: CategoriesComponent },

  { path: "a/user/:id", title: appNameTitle + ' - Modify User', component: UserComponent },
  { path: "a/product/:id", title: appNameTitle + ' - Modify Product', component: ProductComponent },
  { path: "a/category/:id", title: appNameTitle + ' - Modify Category', component: CategoryComponent },

  { path: "a/user", title: appNameTitle + ' - Add User', component: UserComponent },
  { path: "a/product", title: appNameTitle + ' - Add Product', component: ProductComponent },
  { path: "a/category", title: appNameTitle + ' - Add Category', component: CategoryComponent },

  { path: "profile/:id", title: appNameTitle + ' - Profile', component: ProfileComponent },

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
