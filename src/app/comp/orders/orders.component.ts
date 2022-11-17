import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderN } from 'src/app/models/order.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  id: any;
  uid: string;
  products: any;
  cartCount: any;
  cartItems: any;
  isIDEnabled: boolean;
  cat_name: string;
  NoOfItems: number = 0;
  cartTotal: string;
  Total_Amount: number = 0;
  isOfferActivated: boolean = false;
  offerPer: number = 0;
  order: Order = new Order();
  orderN: OrderN[]
  NoOfOrders: number = 0;

  constructor(private route: ActivatedRoute, private service: ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.uid = String(sessionStorage.getItem('g_uid'))
    this.NoOfItems = parseInt(sessionStorage.getItem("g_cartCount") as any)

    this.cartItems = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
    this.cartCount = JSON.parse(sessionStorage.getItem("g_cartCount") as any)
    this.cartTotal = String(sessionStorage.getItem("g_cartTotal"))
    this.cartTotal = this.cartTotal.split('"').join('')
    this.Total_Amount = parseFloat(this.cartTotal.split(',').join(''))

    if (this.id == null) {
      this.isIDEnabled = false
      this.cat_name = "Make Payment"

    } else {
      this.isIDEnabled = true
      this.cat_name = "Order History"
      // Orders api get by user ID
      this.service.getOrdersByUserId(this.uid).subscribe(x => {
        this.orderN = x
        this.NoOfOrders = x.length
        console.log(x)
      })

    }
  }

  makeOffer(offPer: number) {

    this.cartTotal = String(sessionStorage.getItem("g_cartTotal"))
    this.cartTotal = this.cartTotal.split('"').join('')
    this.cartTotal = this.cartTotal.split(',').join('')

    if (offPer != 0) {
      this.Total_Amount = (parseInt(this.cartTotal) * ((100 - offPer) / 100))
      this.cartTotal = this.Total_Amount.toLocaleString()

      this.isOfferActivated = true
      this.offerPer = offPer
    } else {
      this.Total_Amount = parseInt(this.cartTotal)
      this.cartTotal = this.Total_Amount.toLocaleString()
      this.isOfferActivated = false
      this.offerPer = 0
    }


  }

  addToOrders() {
    this.cartItems = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
    const orderProducts = this.cartItems.map((post: { _id: string; NofItems: number; }) => ({ product_id: post._id, product_count: post.NofItems }));

    //construct obj to insert
    this.order = {
      user_id: this.uid,
      products: orderProducts,
      status: 'paid',
      totalAmount: this.Total_Amount
    }

    this.service.addOrder(this.order).subscribe((x: any) => {

      this.cartItems = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
      this.cartCount = JSON.parse(sessionStorage.getItem("g_cartCount") as any)
      this.products = JSON.parse(localStorage.getItem("g_Products") as any)

      //clear and update cart
      for (let j = 0; j <= this.products.length - 1; j++) {
        this.products[j].NofItems = 0
      }

      sessionStorage.setItem('g_cartItems', JSON.stringify([]));
      sessionStorage.setItem('g_cartCount', JSON.stringify(0));
      localStorage.setItem('g_Products', JSON.stringify(this.products));

      location.href = 'orders/' + this.uid
    })

  }

  findProductName(id: any) {
    this.products = JSON.parse(localStorage.getItem("g_Products") as any)
    return this.products.filter((x: { _id: string; }) => x._id === id).map((x: { name: string; }) => x.name);
  }

  convertToProperTime(timeStr: any) {
    // "2022-11-17T12:09:09.699Z"
    return timeStr.split('T')[0] + " " + (timeStr.split('T')[1]).split('.')[0] + " (UTC)"
  }
}
