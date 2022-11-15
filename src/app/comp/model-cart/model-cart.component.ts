import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
// import { MdbModalRef } from 'mdb-angular-ui-kit/modal/modal-ref';
import { GlobalConstants } from '../../global-constants';

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
    this.cartItems = GlobalConstants.Cart_Items
  }

  removeItem(removeItem: number): void {
    this.cartItems = JSON.parse("[" + localStorage.getItem('g_cart_items') + "]" as any)
    this.cartItems.splice(removeItem, 1);
    localStorage.setItem('g_cart_count', String(this.cartItems.length))
    localStorage.setItem('g_cart_items', JSON.stringify(this.cartItems))
    GlobalConstants.cartCount--
  }
}
