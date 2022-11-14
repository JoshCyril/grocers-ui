import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
// import { MdbModalRef } from 'mdb-angular-ui-kit/modal/modal-ref';

@Component({
  selector: 'app-model-cart',
  templateUrl: './model-cart.component.html',
  styleUrls: ['./model-cart.component.scss']
})
export class ModelCartComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<ModelCartComponent>) { }
  chkAddedItem: string | any;
  itemObj: any;
  arrGItems: string | any
  public arrItems: string[] = [];
  cartItems: any;

  ngOnInit(): void {
    this.arrGItems = localStorage.getItem('g_cart_items')
    console.log(this.arrItems)
    this.chkAddedItem = localStorage.getItem('g_cart_item')

    this.chkAddedItem = (this.chkAddedItem.substring(0, 0) + this.chkAddedItem.substring(0 + 1))
    this.chkAddedItem = (this.chkAddedItem.substring(0, this.chkAddedItem.length - 1) + this.chkAddedItem.substring((this.chkAddedItem.length - 1) + 1))

    // this.arrItems = [...this.arrGItems, this.chkAddedItem];
    if (this.arrGItems !== null) {
      this.arrItems.push("[" + this.arrGItems + "]")
    }
    this.arrItems.push(this.chkAddedItem)

    this.cartItems = JSON.parse("[" + this.arrItems + "]" as any)
    console.log("🔰", this.cartItems)
    localStorage.setItem('g_cart_items', JSON.stringify(this.arrItems))

    localStorage.setItem('g_cart_count', String(this.arrItems.length))
  }

  removeItem(removeItem: number): void {
    this.cartItems = JSON.parse("[" + localStorage.getItem('g_cart_items') + "]" as any)
    this.cartItems.splice(removeItem, 1);
    localStorage.setItem('g_cart_count', String(this.cartItems.length))
    localStorage.setItem('g_cart_items', JSON.stringify(this.cartItems))
  }
}
