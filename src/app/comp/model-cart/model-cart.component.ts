import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
// import { MdbModalRef } from 'mdb-angular-ui-kit/modal/modal-ref';
import { GlobalConstants } from '../../global-constants';

@Component({
  selector: 'app-model-cart',
  templateUrl: './model-cart.component.html',
  styleUrls: ['./model-cart.component.scss']
})
export class ModelCartComponent implements OnInit {
  NoOfItems: number = 0;
  cartCount: any;
  cartItems: any;
  cartTotal: any
  products: any;
  itemDeleted: boolean = false;

  constructor(public modalRef: MdbModalRef<ModelCartComponent>, public router: Router) { }

  ngOnInit(): void {
    this.cartItems = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
    this.cartTotal = this.getTotal()
    this.NoOfItems = parseInt(sessionStorage.getItem("g_cartCount") as any)
    sessionStorage.setItem("g_cartTotal", JSON.stringify(this.cartTotal));
  }

  removeItems(removeItem: any, NoI: any, id: any) {

    this.cartItems = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
    this.cartCount = JSON.parse(sessionStorage.getItem("g_cartCount") as any)
    this.products = JSON.parse(localStorage.getItem("g_Products") as any)


    this.cartItems.splice(removeItem, 1);
    this.cartCount = this.cartCount - NoI

    for (let i = 0; i <= this.products.length - 1; i++) {
      if (this.products[i]._id === id) {
        this.products[i].quantity = this.products[i].quantity + this.products[i].NofItems
        this.products[i].NofItems = 0
        break;
      }
    }

    sessionStorage.setItem('g_cartItems', JSON.stringify(this.cartItems));
    sessionStorage.setItem('g_cartCount', JSON.stringify(this.cartCount));
    localStorage.setItem('g_Products', JSON.stringify(this.products));

    this.cartTotal = this.getTotal()
    sessionStorage.setItem("g_cartTotal", JSON.stringify(this.cartTotal));

    this.NoOfItems = parseInt(sessionStorage.getItem("g_cartCount") as any)
    this.itemDeleted = true;
  }

  getTotal() {
    let tAmount: number;
    tAmount = 0
    this.cartItems = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
    for (let i = 0; i <= this.cartItems.length - 1; i++) {
      tAmount = tAmount + (this.cartItems[i].NofItems * this.cartItems[i].F_price)
    }
    return tAmount.toLocaleString()
  }

  updateDat() {
    this.modalRef.close()

    if (this.itemDeleted) {
      this.itemDeleted = false;
      location.href = this.router.url;
    }
  }

  chkOut() {
    this.modalRef.close()

    if (this.itemDeleted) {
      this.itemDeleted = false;
    }

    location.href = '/orders';
  }
}
