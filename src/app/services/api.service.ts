import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { UserDB } from '../models/userDB.model';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Order, OrderN } from '../models/order.model';
import { Wishlist, WishlistN } from '../models/wishlist.model';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://api-grocers.herokuapp.com/api/";
  dbUser: string = "user";
  dbProduct: string = "product";
  dbCategory: string = "category";
  dbOrder: string = "order";
  dbWishlist: string = "wishlist";

  // ! Users --------------
  loginUser(name: string, email: string, password: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "login" + "?name=" + name + "&email=" + email + "&password=" + password);
  }
  chkUserExist(): Observable<UserDB[]> {
    return this.http.get<UserDB[]>(this.baseUrl + "reg");
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "all" + "?_db=" + this.dbUser);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + id + "?_db=" + this.dbUser);
  }
  removeUserById(id: string) {
    return this.http.delete(this.baseUrl + "remove/" + id + "?_db=" + this.dbUser);
  }
  addUser(user: User) {
    return this.http.post(this.baseUrl + "add/user", user);
  }
  modifyUser(user: User, id: string) {
    return this.http.put(this.baseUrl + "modify/" + id + "?_db=" + this.dbUser, user);
  }


  // ! Category --------------
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + "all" + "?_db=" + this.dbCategory);
  }
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + id + "?_db=" + this.dbCategory);
  }
  removeCategoryById(id: string) {
    return this.http.delete(this.baseUrl + "remove/" + id + "?_db=" + this.dbCategory);
  }
  addCategory(category: Category) {
    return this.http.post(this.baseUrl + "add" + "?_db=" + this.dbCategory, category);
  }
  modifyCategory(category: Category, id: string) {
    return this.http.put(this.baseUrl + "modify/" + id + "?_db=" + this.dbCategory, category);
  }

  // ! Products --------------
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "all" + "?_db=" + this.dbProduct);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + id + "?_db=" + this.dbProduct);
  }
  removeProductById(id: string) {
    return this.http.delete(this.baseUrl + "remove/" + id + "?_db=" + this.dbProduct);
  }
  addProduct(product: Product) {
    return this.http.post(this.baseUrl + "add" + "?_db=" + this.dbProduct, product);
  }
  modifyProduct(product: Product, id: string) {
    return this.http.put(this.baseUrl + "modify/" + id + "?_db=" + this.dbProduct, product);
  }

  // ! Orders --------------
  getAllOrdersById(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + "order" + "?_db=" + this.dbOrder + "&id=" + id);
  }
  getOrdersByUserId(uid: string): Observable<OrderN[]> {
    return this.http.get<OrderN[]>(this.baseUrl + "u/" + uid + "?_db=" + this.dbOrder);
  }
  removeOrderById(id: string) {
    return this.http.delete(this.baseUrl + "remove/" + id + "?_db=" + this.dbOrder);
  }
  addOrder(order: Order) {
    return this.http.post(this.baseUrl + "add" + "?_db=" + this.dbOrder, order);
  }
  modifyOrder(order: Order, id: string) {
    return this.http.put(this.baseUrl + "modify/" + id + "?_db=" + this.dbOrder, order);
  }

  // ! WishList --------------
  getAllWishListById(id: string): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.baseUrl + "wishlist" + "?_db=" + this.dbWishlist + "&id=" + id);
  }
  getWishListsByUserId(uid: string): Observable<WishlistN[]> {
    return this.http.get<WishlistN[]>(this.baseUrl + "u/" + uid + "?_db=" + this.dbWishlist);
  }
  removeWishListById(id: string) {
    return this.http.delete(this.baseUrl + "remove/" + id + "?_db=" + this.dbWishlist);
  }
  addWishList(wishlist: Wishlist) {
    return this.http.post(this.baseUrl + "add" + "?_db=" + this.dbWishlist, wishlist);
  }
  modifyWishList(wishlist: Wishlist, id: string) {
    return this.http.put(this.baseUrl + "modify/" + id + "?_db=" + this.dbWishlist, wishlist);
  }

}
